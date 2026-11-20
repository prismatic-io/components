import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient, type HttpClient } from "@prismatic-io/spectral/http";
import connections from "./connections";
import { HTTP_STATUS_UNAUTHORIZED, TENANT_PLACEHOLDER } from "./constants";
import type { ForceRefreshOptions, WorkdayHttpError } from "./types";
import {
  getAccessToken,
  getBaseUrl,
  getConnectionTenant,
  usesRefreshToken,
} from "./util";

export const validateConnection = (connection: Connection): void => {
  const connectionKeys = connections.map((c) => c.key);
  if (!connectionKeys.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection ${connection.key}.`,
    );
  }
};

export const getAuthorizationHeader = async (
  connection: Connection,
  { forceRefresh = false }: ForceRefreshOptions = {},
): Promise<string> => {
  validateConnection(connection);
  const accessToken = util.types.toString(
    await getAccessToken(connection, { forceRefresh }),
  );
  if (!accessToken) {
    throw new ConnectionError(
      connection,
      "The connection has no access token. Reauthenticate the connection.",
    );
  }
  return `Bearer ${accessToken}`;
};

const isRetryableUnauthorized = (
  connection: Connection,
  error: unknown,
): boolean =>
  usesRefreshToken(connection) &&
  (error as WorkdayHttpError).response?.status === HTTP_STATUS_UNAUTHORIZED;

export const withTokenRefreshRetry = async <T>(
  connection: Connection,
  send: (authorization: string) => Promise<T>,
): Promise<T> => {
  try {
    return await send(await getAuthorizationHeader(connection));
  } catch (error) {
    if (!isRetryableUnauthorized(connection, error)) {
      throw error;
    }
    return send(
      await getAuthorizationHeader(connection, { forceRefresh: true }),
    );
  }
};

export const resolveTenantPlaceholder = (
  connection: Connection,
  url: string | undefined,
): string | undefined => {
  if (!url?.includes(TENANT_PLACEHOLDER)) {
    return url;
  }
  const tenant = getConnectionTenant(connection);
  if (!tenant) {
    throw new ConnectionError(
      connection,
      "Could not find the Workday tenant. Enter the Token URL as shown in View API Clients, in the form https://<host>/ccx/oauth2/<tenant>/token.",
    );
  }
  return url.split(TENANT_PLACEHOLDER).join(encodeURIComponent(tenant));
};

export const getClient = (
  connection: Connection,
  debug = false,
  baseUrl: string = getBaseUrl(connection),
): HttpClient => {
  validateConnection(connection);
  const client = createClient({
    baseUrl,
    debug,
    responseType: "json",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  client.interceptors.request.use(async (config) => {
    config.url = resolveTenantPlaceholder(connection, config.url);
    config.headers.Authorization = await getAuthorizationHeader(connection);
    return config;
  });
  client.interceptors.response.use(undefined, async (error) => {
    const config = error.config as
      | (typeof error.config & { _workdayTokenRetried?: boolean })
      | undefined;
    if (
      !isRetryableUnauthorized(connection, error) ||
      !config ||
      config._workdayTokenRetried
    ) {
      throw error;
    }
    config._workdayTokenRetried = true;
    await getAccessToken(connection, { forceRefresh: true });
    return client.request(config);
  });
  return client;
};
