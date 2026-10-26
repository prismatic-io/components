import { createHash } from "node:crypto";
import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { workdayRefreshTokenConnection } from "../connections/workdayRefreshTokenConnection";
import {
  DEFAULT_TOKEN_TTL_MS,
  MS_PER_SECOND,
  TOKEN_ERROR_MAX_LENGTH,
  TOKEN_EXPIRY_MARGIN_SECONDS,
} from "../constants";
import type {
  CachedToken,
  ForceRefreshOptions,
  WorkdayEndpoint,
  WorkdayHttpError,
} from "../types";
import { buildTokenUrl, parseRestApiEndpoint } from "./workdayUrls";
const tokenCache = new Map<string, CachedToken>();
const rotatedRefreshTokens = new Map<string, string>();
export const usesRefreshToken = (connection: Connection): boolean =>
  connection.key === workdayRefreshTokenConnection.key;
const parseConnectionEndpoint = (connection: Connection): WorkdayEndpoint => {
  try {
    return parseRestApiEndpoint(
      util.types.toString(connection.fields.restApiUrl),
    );
  } catch (error) {
    throw new ConnectionError(connection, (error as Error).message);
  }
};
export const getBaseUrl = (connection: Connection): string =>
  usesRefreshToken(connection)
    ? parseConnectionEndpoint(connection).baseUrl
    : util.types.toString(connection.fields.apiUrl);
export const getConnectionTenant = (
  connection: Connection,
): string | undefined =>
  usesRefreshToken(connection)
    ? parseConnectionEndpoint(connection).tenant
    : undefined;
const describeTokenError = (error: unknown): string => {
  const response = (error as WorkdayHttpError).response;
  const data = response?.data as Record<string, unknown> | undefined;
  const parts = [data?.error, data?.error_description].filter(
    (part): part is string => typeof part === "string",
  );
  const status = response?.status ? ` (HTTP ${response.status})` : "";
  if (parts.length > 0) {
    return `${status}: ${parts.join(": ").slice(0, TOKEN_ERROR_MAX_LENGTH)}`;
  }
  return response ? status : `: ${(error as Error).message}`;
};
const cacheKey = (connection: Connection): string =>
  createHash("sha256")
    .update(
      [
        connection.fields.restApiUrl,
        connection.fields.tokenUrl,
        connection.fields.clientId,
        connection.fields.clientSecret,
        connection.fields.refreshToken,
      ]
        .map((value) => util.types.toString(value))
        .join("\n"),
    )
    .digest("hex");
const getTokenUrl = (connection: Connection): string => {
  const override = util.types.toString(connection.fields.tokenUrl).trim();
  if (override && !override.startsWith("https://")) {
    throw new ConnectionError(connection, "The Token URL must use https://.");
  }
  return override || buildTokenUrl(parseConnectionEndpoint(connection));
};
const exchangeRefreshToken = async (
  connection: Connection,
  key: string,
): Promise<CachedToken> => {
  const clientId = util.types.toString(connection.fields.clientId);
  const clientSecret = util.types.toString(connection.fields.clientSecret);
  const refreshToken =
    rotatedRefreshTokens.get(key) ??
    util.types.toString(connection.fields.refreshToken);
  const client = createClient({
    baseUrl: getTokenUrl(connection),
    responseType: "json",
  });
  try {
    const { data } = await client.post(
      "",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
      }).toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      },
    );
    if (typeof data?.access_token !== "string") {
      throw new Error("Token response did not include an access_token.");
    }
    if (
      typeof data.refresh_token === "string" &&
      data.refresh_token !== refreshToken
    ) {
      rotatedRefreshTokens.set(key, data.refresh_token);
      console.warn(
        "Workday returned a different refresh token. If the stored refresh token stops working, Workday is rotating tokens for this API client.",
      );
    }
    return {
      accessToken: data.access_token,
      expiresAt:
        Date.now() +
        (typeof data.expires_in === "number"
          ? (data.expires_in - TOKEN_EXPIRY_MARGIN_SECONDS) * MS_PER_SECOND
          : DEFAULT_TOKEN_TTL_MS),
    };
  } catch (error) {
    if (error instanceof ConnectionError) {
      throw error;
    }
    throw new ConnectionError(
      connection,
      `Workday token request failed${describeTokenError(error)}`,
    );
  }
};
export const getAccessToken = async (
  connection: Connection,
  { forceRefresh = false }: ForceRefreshOptions = {},
): Promise<string> => {
  if (!usesRefreshToken(connection)) {
    return util.types.toString(connection.token?.access_token);
  }
  const key = cacheKey(connection);
  const cached = tokenCache.get(key);
  if (!forceRefresh && cached && Date.now() < cached.expiresAt) {
    return cached.accessToken;
  }
  const token = await exchangeRefreshToken(connection, key);
  tokenCache.set(key, token);
  return token.accessToken;
};
export const clearTokenCache = (): void => {
  tokenCache.clear();
  rotatedRefreshTokens.clear();
};
