import { createHash, createSign } from "node:crypto";
import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/http";
import {
  GOOGLE_ADS_OAUTH_SCOPE,
  GOOGLE_OAUTH_TOKEN_URL,
  JWT_BEARER_GRANT_TYPE,
  SERVICE_ACCOUNT_TOKEN_LIFETIME_SECONDS,
  SERVICE_ACCOUNT_TOKEN_REFRESH_MARGIN_SECONDS,
} from "../constants";
import type {
  GoogleServiceAccountKey,
  ServiceAccountTokenResponse,
} from "../types";

const tokenCache = new Map<
  string,
  { accessToken: string; expiresAt: number }
>();

const base64Url = (value: string | Buffer): string =>
  Buffer.from(value).toString("base64url");

const parseServiceAccountKey = (
  connection: Connection,
): GoogleServiceAccountKey => {
  const key = util.types.toObject(
    connection.fields.keyFile,
  ) as Partial<GoogleServiceAccountKey>;
  if (
    !util.types.isString(key?.client_email) ||
    !util.types.isString(key?.private_key)
  ) {
    throw new ConnectionError(
      connection,
      "The Service Account Key File must be the service account's JSON key, including client_email and private_key.",
    );
  }
  return key as GoogleServiceAccountKey;
};

const buildAssertion = (
  key: GoogleServiceAccountKey,
  scopes: string,
  audience: string,
  issuedAt: number,
): string => {
  const header = base64Url(
    JSON.stringify({
      alg: "RS256",
      typ: "JWT",
      ...(key.private_key_id !== undefined && { kid: key.private_key_id }),
    }),
  );
  const claims = base64Url(
    JSON.stringify({
      iss: key.client_email,
      scope: scopes,
      aud: audience,
      iat: issuedAt,
      exp: issuedAt + SERVICE_ACCOUNT_TOKEN_LIFETIME_SECONDS,
    }),
  );
  const signature = createSign("RSA-SHA256")
    .update(`${header}.${claims}`)
    .sign(key.private_key.replace(/\\n/g, "\n"));
  return `${header}.${claims}.${base64Url(signature)}`;
};

export const getServiceAccountToken = async (
  connection: Connection,
): Promise<string> => {
  const key = parseServiceAccountKey(connection);
  const scopes = util.types.toString(connection.fields.scopes).trim();
  const scope = scopes === "" ? GOOGLE_ADS_OAUTH_SCOPE : scopes;
  const tokenUrl = key.token_uri ?? GOOGLE_OAUTH_TOKEN_URL;
  const keyHash = createHash("sha256").update(key.private_key).digest("hex");
  const cacheKey = `${key.client_email} ${scope} ${tokenUrl} ${keyHash}`;
  const now = Math.floor(Date.now() / 1000);

  const cached = tokenCache.get(cacheKey);
  if (cached !== undefined && cached.expiresAt > now) {
    return cached.accessToken;
  }

  const client = createHttpClient({ baseUrl: tokenUrl, responseType: "json" });
  const { data } = await client.post<ServiceAccountTokenResponse>(
    "",
    new URLSearchParams({
      grant_type: JWT_BEARER_GRANT_TYPE,
      assertion: buildAssertion(key, scope, tokenUrl, now),
    }),
  );

  tokenCache.set(cacheKey, {
    accessToken: data.access_token,
    expiresAt:
      now + data.expires_in - SERVICE_ACCOUNT_TOKEN_REFRESH_MARGIN_SECONDS,
  });
  return data.access_token;
};
