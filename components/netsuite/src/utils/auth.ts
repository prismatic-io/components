import * as crypto from "node:crypto";
import { URLSearchParams } from "node:url";
import { type Connection, util } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/http";
import * as jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_LIFETIME_SECONDS,
  ACCESS_TOKEN_REFRESH_MARGIN_MS,
  ACCOUNT_REGEX,
  DEFAULT_SCOPES,
  ecCurveAlgorithms,
  JWT_ASSERTION_LIFETIME_SECONDS,
  TOKEN_PATH,
} from "../constants";
import { netSuiteRetryConfig } from "./errors";

export const accountOrigin = (tokenUrl: string): string => {
  const accountId = ACCOUNT_REGEX.exec(tokenUrl)?.[1];
  if (!accountId) {
    throw new Error("Unable to extract account ID from the Token URL.");
  }
  return `https://${accountId.toLowerCase().replace(/_/g, "-")}.suitetalk.api.netsuite.com`;
};

const signingAlgorithm = (key: crypto.KeyObject): jwt.Algorithm => {
  if (key.asymmetricKeyType === "rsa" || key.asymmetricKeyType === "rsa-pss") {
    return "PS256";
  }
  const curve = key.asymmetricKeyDetails?.namedCurve;
  if (key.asymmetricKeyType === "ec" && curve && ecCurveAlgorithms[curve]) {
    return ecCurveAlgorithms[curve];
  }
  throw new Error(
    `Unsupported private key type: ${key.asymmetricKeyType}${curve ? ` (${curve})` : ""}. NetSuite accepts an RSA key or an EC key on the P-256, P-384 or P-521 curve.`,
  );
};

const formatScopes = (rawScopes: unknown): string => {
  const scopes = util.types
    .toString(rawScopes)
    .split(/[\s,]+/)
    .filter(Boolean);
  return scopes.length > 0 ? scopes.join(", ") : DEFAULT_SCOPES;
};

const createDynamicJWTToken = (connection: Connection): string => {
  const privateKey = crypto.createPrivateKey(
    util.types.toString(connection.fields.privateKey).replace(/\\n/g, "\n"),
  );
  const algorithm = signingAlgorithm(privateKey);
  const tokenUrl = util.types.toString(connection.fields.tokenUrl);
  const issuedAt = Math.floor(Date.now() / 1000);

  const payload = {
    iss: connection.fields.clientId,
    aud: `${accountOrigin(tokenUrl)}${TOKEN_PATH}`,
    exp: issuedAt + JWT_ASSERTION_LIFETIME_SECONDS,
    iat: issuedAt,
    scope: formatScopes(connection.fields.scopes),
  };

  return jwt.sign(payload, privateKey, {
    algorithm,
    header: {
      kid: util.types.toString(connection.fields.keyId),
      typ: "JWT",
      alg: algorithm,
    },
  });
};

const accessTokenCache = new Map<
  string,
  { accessToken: string; expiresAt: number }
>();

const credentialsCacheKey = (connection: Connection): string =>
  crypto
    .createHash("sha256")
    .update(
      JSON.stringify([
        connection.fields.tokenUrl,
        connection.fields.clientId,
        connection.fields.keyId,
        connection.fields.privateKey,
        connection.fields.scopes,
      ]),
    )
    .digest("hex");

export const evictClientCredentialsToken = (connection: Connection): void => {
  accessTokenCache.delete(credentialsCacheKey(connection));
};

export const getClientCredentialsToken = async (
  connection: Connection,
): Promise<string> => {
  const cacheKey = credentialsCacheKey(connection);
  const cached = accessTokenCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.accessToken;
  }

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append(
    "client_assertion_type",
    "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
  );
  params.append("client_assertion", createDynamicJWTToken(connection));
  const client = createHttpClient({
    baseUrl: accountOrigin(util.types.toString(connection.fields.tokenUrl)),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    retryConfig: netSuiteRetryConfig,
  });
  const { data } = await client.post(TOKEN_PATH, params);

  const accessToken = util.types.toString(data?.access_token);
  if (!accessToken) {
    throw new Error("Did not receive an access token to use.");
  }
  const lifetimeSeconds =
    util.types.toNumber(data?.expires_in) || ACCESS_TOKEN_LIFETIME_SECONDS;
  accessTokenCache.set(cacheKey, {
    accessToken,
    expiresAt:
      Date.now() + lifetimeSeconds * 1000 - ACCESS_TOKEN_REFRESH_MARGIN_MS,
  });
  return accessToken;
};
