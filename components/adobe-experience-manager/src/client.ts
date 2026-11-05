import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient as createHttpClient, type HttpClient } from "@prismatic-io/spectral/http";
import { aemOAuthServerToServer, aemOAuthWebApp } from "./connections";
import {
  AEM_HOST_SUFFIX,
  IO_EVENTS_BASE_URL,
  MAX_RETRIES,
  PUBLIC_CLIENT_BASE_URL,
  RETRYABLE_STATUS_CODES,
} from "./constants";
import { assertPublicUrl, publicHttpsAgent } from "./utils/network";

const SETUP_HINT =
  "AEM returned 403 Forbidden. Confirm the connection's Client ID is listed under allowedClientIDs.author in the environment's config/api.yaml, and that the Developer Console credential includes a product profile with access to this API.";
const WEB_APP_SETUP_HINT =
  "AEM returned 403 Forbidden. Confirm the connection's Client ID is listed under allowedClientIDs.author in the environment's config/api.yaml, and that the signed-in Adobe user has AEM access to this content.";
const GATEWAY_INVALID_API_KEY = "403003";
const GATEWAY_HINT =
  "Adobe's API gateway rejected the connection's Client ID for this endpoint (Api Key is invalid). Confirm the Developer Console project behind the credential includes the AEM API that serves this request.";

const retryConfig = {
  retries: MAX_RETRIES,
  useExponentialBackoff: true,
  retryCondition: (error: { response?: { status?: number } }): boolean =>
    RETRYABLE_STATUS_CODES.includes(error.response?.status ?? 0),
};

export const getAemHost = (connection: Connection): string => {
  const raw = util.types.toString(connection.fields.aemHost).trim();
  let parsed: URL | undefined;
  try {
    parsed = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    parsed = undefined;
  }
  const host = (parsed?.hostname ?? raw).toLowerCase().replace(/\.$/, "");
  if (
    !parsed ||
    parsed.username ||
    parsed.password ||
    parsed.port ||
    !/^[a-z0-9-]+(\.[a-z0-9-]+)*$/.test(host) ||
    !host.endsWith(AEM_HOST_SUFFIX)
  ) {
    throw new ConnectionError(
      connection,
      `AEM Author Host must be an AEM as a Cloud Service host ending in ${AEM_HOST_SUFFIX}, such as author-p12345-e123456${AEM_HOST_SUFFIX}. Received: "${host}"`,
    );
  }
  return host;
};

const getAuthHeaders = (connection: Connection): Record<string, string> => {
  if (connection.key !== aemOAuthServerToServer.key && connection.key !== aemOAuthWebApp.key) {
    throw new ConnectionError(connection, `Unexpected connection type: ${connection.key}`);
  }
  return {
    Authorization: `Bearer ${util.types.toString(connection.token?.access_token)}`,
    "X-Api-Key": util.types.toString(connection.fields.clientId),
  };
};

const MISSING_SCOPES_DETAIL = /missing required scopes/i;
const WEB_APP_SCOPES_HINT =
  "This request needs a scope the OAuth Web App credential is not granted, so use the OAuth 2.0 Client Credentials connection for it: content fragment actions and the New and Updated Fragments trigger need it.";
const HTML_PAGE_HINT =
  "Adobe returned an HTML error page instead of a JSON problem, which it does for a job or asset ID it does not know.";
const UNAVAILABLE_STATUS_CODES = [502, 503, 504];
const UNAVAILABLE_HINT =
  "The Adobe Experience Manager environment is unavailable. A sandbox environment answers this way for several minutes while it de-hibernates or restarts: check its status in Cloud Manager and retry.";
const HTML_SUCCESS_MESSAGE =
  "Adobe Experience Manager returned an HTML page instead of a JSON response. A hibernated sandbox environment answers this way: de-hibernate it in Cloud Manager and retry.";
const HTML_PAGE_PATTERN = /^\s*(<!doctype html|<html)/i;

const addSetupHint = (client: HttpClient, connection: Connection): void => {
  const hint = connection.key === aemOAuthWebApp.key ? WEB_APP_SETUP_HINT : SETUP_HINT;
  client.interceptors.response.use(
    undefined,
    (error: { response?: { status?: number; data?: unknown }; message: string }) => {
      if (typeof error.response?.data === "string" && HTML_PAGE_PATTERN.test(error.response.data)) {
        error.response.data = "(HTML error page omitted)";
        const unavailable = UNAVAILABLE_STATUS_CODES.includes(error.response.status ?? 0);
        error.message = `${error.message}. ${unavailable ? UNAVAILABLE_HINT : HTML_PAGE_HINT}`;
      }
      if (error.response?.status === 403) {
        const body = error.response.data as { error_code?: string; detail?: string } | undefined;
        const detail = typeof body?.detail === "string" ? body.detail : undefined;
        const cause =
          body?.error_code === GATEWAY_INVALID_API_KEY
            ? GATEWAY_HINT
            : connection.key === aemOAuthWebApp.key && detail && MISSING_SCOPES_DETAIL.test(detail)
              ? WEB_APP_SCOPES_HINT
              : hint;
        error.message = `${cause}${detail ? ` Adobe: ${detail}` : ""} ${error.message}`;
      }
      return Promise.reject(error);
    },
  );
};

export const getAemBaseUrl = (connection: Connection): string =>
  `https://${getAemHost(connection)}`;

export const createAemClient = (connection: Connection, debug = false): HttpClient => {
  const client = createHttpClient({
    baseUrl: getAemBaseUrl(connection),
    headers: getAuthHeaders(connection),
    debug,
    retryConfig,
    responseType: "json",
  });
  client.interceptors.response.use((response) => {
    if (typeof response.data === "string" && HTML_PAGE_PATTERN.test(response.data)) {
      throw new Error(HTML_SUCCESS_MESSAGE);
    }
    return response;
  });
  addSetupHint(client, connection);
  return client;
};

export const createAemDownloadClient = (connection: Connection, debug = false): HttpClient => {
  const client = createHttpClient({
    baseUrl: getAemBaseUrl(connection),
    headers: getAuthHeaders(connection),
    debug,
    retryConfig,
    responseType: "arraybuffer",
  });
  addSetupHint(client, connection);
  return client;
};

export const isIoEventsConnection = (connection: Connection): boolean =>
  connection.key === aemOAuthServerToServer.key;

export const createIoEventsClient = (connection: Connection, debug = false): HttpClient => {
  if (!isIoEventsConnection(connection)) {
    throw new ConnectionError(
      connection,
      "Adobe I/O Events registrations require the OAuth 2.0 Client Credentials connection.",
    );
  }
  return createHttpClient({
    baseUrl: IO_EVENTS_BASE_URL,
    headers: getAuthHeaders(connection),
    debug,
    retryConfig,
    responseType: "json",
  });
};

export const createPublicClient = (debug = false): HttpClient => {
  const client = createHttpClient({
    baseUrl: PUBLIC_CLIENT_BASE_URL,
    debug,
    retryConfig,
    responseType: "text",
  });
  client.defaults.httpsAgent = publicHttpsAgent;
  client.defaults.beforeRedirect = (options: Record<string, unknown>) => {
    assertPublicUrl(util.types.toString(options.href));
  };
  client.interceptors.request.use((config) => {
    assertPublicUrl(util.types.toString(config.url));
    return config;
  });
  return client;
};
