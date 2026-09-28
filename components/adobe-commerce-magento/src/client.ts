import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import {
  createClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { adobeCommerceApiKey } from "./connections/adobeCommerceApiKey";
import { adobeCommerceOauth1 } from "./connections/adobeCommerceOauth1";
import { DEFAULT_STORE_CODE, productionUrl, sandboxUrl } from "./constants";
import type { Oauth1Credentials, StoreConfig } from "./types";
import { buildAuthorizationHeader } from "./utils/oauth1";
const validateConnection = (connection: Connection) => {
  if (
    ![adobeCommerceOauth1.key, adobeCommerceApiKey.key].includes(connection.key)
  ) {
    throw new ConnectionError(connection, "Unknown Connection type provided.");
  }
};
export const normalizeStoreUrl = (
  connection: Connection,
  storeUrl: string,
): string => {
  const trimmed = storeUrl
    .trim()
    .replace(/\/+$/, "")
    .replace(/\/rest$/i, "");
  const withoutScheme = trimmed.replace(/^[a-z][a-z0-9+.-]*:\/\//i, "");
  try {
    return new URL(`https://${withoutScheme}`).origin;
  } catch {
    throw new ConnectionError(
      connection,
      `Unable to parse Store URL "${storeUrl}". It should look like "https://www.example.com".`,
    );
  }
};
export const getStoreCode = (connection: Connection): string => {
  if (connection.key !== adobeCommerceOauth1.key) {
    return DEFAULT_STORE_CODE;
  }
  return (
    util.types.toString(connection.fields?.storeCode).trim() ||
    DEFAULT_STORE_CODE
  );
};
const getOauth1Credentials = (connection: Connection): Oauth1Credentials => {
  const required = {
    consumerKey: "Consumer Key",
    consumerSecret: "Consumer Secret",
    accessToken: "Access Token",
    accessTokenSecret: "Access Token Secret",
  } as const;
  const credentials = Object.fromEntries(
    Object.keys(required).map((field) => [
      field,
      util.types.toString(connection.fields?.[field]).trim(),
    ]),
  ) as unknown as Oauth1Credentials;
  const missing = Object.entries(required)
    .filter(([field]) => !credentials[field as keyof Oauth1Credentials])
    .map(([, label]) => label);
  if (missing.length > 0) {
    throw new ConnectionError(
      connection,
      `${missing.join(", ")} ${missing.length === 1 ? "is" : "are"} required. Copy the value shown when the integration was activated in the Adobe Commerce Admin.`,
    );
  }
  return credentials;
};
export const getConfig = async (
  connection: Connection,
  debug: boolean,
): Promise<StoreConfig> => {
  validateConnection(connection);
  if (connection.key === adobeCommerceOauth1.key) {
    const credentials = getOauth1Credentials(connection);
    return {
      environmentUrl: normalizeStoreUrl(
        connection,
        util.types.toString(connection?.fields?.storeUrl),
      ),
      authorize: ({ method, url, params = [] }) =>
        buildAuthorizationHeader({ method, url, params, credentials }),
    };
  }
  const useProductionEnvironment = connection?.fields?.productionEnvironment;
  const environmentUrl = useProductionEnvironment ? productionUrl : sandboxUrl;
  const sessionClient = createClient({
    baseUrl: environmentUrl,
    headers: { "Content-Type": "application/json" },
    debug,
  });
  const auth = {
    username: util.types.toString(connection?.fields?.applicationId),
    password: util.types.toString(connection?.fields?.applicationSecret),
  };
  try {
    const { data } = await sessionClient.post(
      "/rest/v1/app/session/token",
      {
        grant_type: "session",
        expires_in: 7200,
      },
      { auth },
    );
    const token = util.types.toString(data?.ust).trim();
    if (!token) {
      throw new ConnectionError(
        connection,
        "The session token response did not include a token.",
      );
    }
    return { environmentUrl, authorize: () => `Bearer ${token}` };
  } catch (error) {
    if (error instanceof ConnectionError) {
      throw error;
    }
    throw new ConnectionError(connection, "Unable to obtain a session token.");
  }
};
export const resolveRequestUrl = (
  baseUrl: string,
  url: string | undefined,
): string => {
  const path = url ?? "";
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(path)) {
    return path;
  }
  return `${baseUrl.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
};
export const toSignatureParams = (params: unknown): Array<[string, string]> => {
  if (!params || typeof params !== "object") {
    return [];
  }
  return Object.entries(params as Record<string, unknown>).flatMap(
    ([name, value]) => {
      if (value === undefined || value === null) {
        return [];
      }
      if (Array.isArray(value)) {
        return value.map((entry): [string, string] => [
          `${name}[]`,
          String(entry),
        ]);
      }
      return [[name, String(value)] as [string, string]];
    },
  );
};
export const toRawRequestParams = (
  queryParams: unknown,
): Array<[string, string]> => {
  if (!Array.isArray(queryParams)) {
    return [];
  }
  return queryParams.flatMap((entry): Array<[string, string]> => {
    if (!entry || typeof entry !== "object" || !("key" in entry)) {
      return [];
    }
    const { key, value } = entry as {
      key: unknown;
      value?: unknown;
    };
    return [
      [String(key), value === undefined || value === null ? "" : String(value)],
    ];
  });
};
export const getClient = async (
  connection: Connection,
  debug: boolean,
): Promise<HttpClient> => {
  const { environmentUrl, authorize } = await getConfig(connection, debug);
  const baseUrl = `${environmentUrl}/rest/${getStoreCode(connection)}/V1`;
  const client = createClient({
    baseUrl,
    headers: { "Content-Type": "application/json" },
    debug,
  });
  client.interceptors.request.use((config) => {
    const header = authorize({
      method: config.method ?? "get",
      url: resolveRequestUrl(config.baseURL ?? baseUrl, config.url),
      params: toSignatureParams(config.params),
    });
    config.headers.set("Authorization", header);
    return config;
  });
  return client;
};
