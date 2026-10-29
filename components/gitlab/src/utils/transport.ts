import { type ActionLogger, util } from "@prismatic-io/spectral";
import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import {
  DEBUG_BODY_LIMIT_BYTES,
  DEFAULT_GITLAB_URL,
  IDEMPOTENT_METHODS,
  MAX_RETRY_DELAY_MS,
  REDACTED_BODY_KEYS,
  REDACTED_HEADERS,
  REDACTED_QUERY_PARAMS,
  RETRY_BASE_DELAY_MS,
  RETRYABLE_NETWORK_CODES,
  TLS_TRUST_CODES,
} from "../constants";

export const normalizeGitlabUrl = (value: unknown): string => {
  let raw = util.types.toString(value).trim() || DEFAULT_GITLAB_URL;
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(raw)) {
    raw = `https://${raw}`;
  }
  const url = new URL(raw);
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error(
      `GitLab URL must use http or https. Received: ${url.protocol}`,
    );
  }
  const path = url.pathname.replace(/\/+$/, "").replace(/\/api\/v4$/i, "");
  return `${url.protocol}//${url.host}${path}`;
};

export const isRetryableError = (error: AxiosError): boolean => {
  const status = error.response?.status;
  const method = (error.config?.method ?? "get").toLowerCase();
  if (status === 429) {
    return IDEMPOTENT_METHODS.has(method);
  }
  if (method !== "get" && method !== "head") {
    return false;
  }
  if (status !== undefined) {
    return status >= 500;
  }
  return RETRYABLE_NETWORK_CODES.has(error.code ?? "");
};

export const retryDelay = (retryCount: number, error: AxiosError): number => {
  const header = error.response?.headers?.["retry-after"];
  const seconds =
    header !== undefined && util.types.isNumber(header)
      ? util.types.toNumber(header)
      : Number.NaN;
  if (Number.isFinite(seconds) && seconds >= 0) {
    return Math.min(seconds * 1000, MAX_RETRY_DELAY_MS);
  }
  return Math.min(2 ** retryCount * RETRY_BASE_DELAY_MS, MAX_RETRY_DELAY_MS);
};

const describedErrors = new WeakSet<AxiosError>();

export const describeTransportError = (
  error: AxiosError,
  viaTunnel: boolean,
): AxiosError => {
  const status = error.response?.status;
  const code = error.code ?? "";
  let hint: string | undefined;
  if (status === 401) {
    hint =
      "GitLab rejected the credentials. The access token may be expired or revoked; access tokens expire after at most 365 days by default.";
  } else if (status === 403) {
    hint =
      "The credentials lack permission for this request. Write actions need the api scope, and managing webhooks needs the Maintainer or Owner role.";
  } else if (TLS_TRUST_CODES.has(code)) {
    hint =
      "The GitLab instance's TLS certificate is not trusted. Supply the CA Certificate that signed it on the connection.";
  } else if (code === "ERR_TLS_CERT_ALTNAME_INVALID") {
    hint =
      "The GitLab instance's TLS certificate does not match the GitLab URL hostname. Check the GitLab URL on the connection.";
  } else if (viaTunnel && (code === "ECONNREFUSED" || code === "ETIMEDOUT")) {
    hint =
      "The on-prem agent tunnel is unreachable. Check that the on-prem agent is running and connected.";
  }
  if (hint && !describedErrors.has(error)) {
    error.message = `${error.message}. ${hint}`;
    describedErrors.add(error);
  }
  return error;
};

const plainHeaders = (headers: unknown): Record<string, unknown> => {
  const value = headers as
    | { toJSON?: () => Record<string, unknown> }
    | undefined;
  return value?.toJSON ? value.toJSON() : { ...(headers as object) };
};

const redactHeaders = (headers: unknown): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(plainHeaders(headers)).map(([name, value]) => [
      name,
      REDACTED_HEADERS.has(name.toLowerCase()) ? "[REDACTED]" : value,
    ]),
  );

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};

const redactSecrets = (
  value: unknown,
  keys: Set<string>,
  ancestors: WeakSet<object> = new WeakSet(),
): unknown => {
  if (!Array.isArray(value) && !isPlainObject(value)) {
    return value;
  }
  if (ancestors.has(value)) {
    return "[Circular]";
  }
  ancestors.add(value);
  const copy = Array.isArray(value)
    ? value.map((item) => redactSecrets(item, keys, ancestors))
    : Object.fromEntries(
        Object.entries(value).map(([key, item]) => [
          key,
          keys.has(key.toLowerCase())
            ? "[REDACTED]"
            : redactSecrets(item, keys, ancestors),
        ]),
      );
  ancestors.delete(value);
  return copy;
};

const redactQueryString = (text: string, keys: Set<string>): string =>
  text.replace(
    /(^|[?&])([^=&#?]+)=([^&#]*)/g,
    (match, separator: string, name: string) =>
      keys.has(name.toLowerCase()) ? `${separator}${name}=[REDACTED]` : match,
  );

const redactBody = (data: unknown): unknown => {
  if (typeof data !== "string") {
    return redactSecrets(data, REDACTED_BODY_KEYS);
  }
  if (util.types.isJSON(data)) {
    return redactSecrets(JSON.parse(data), REDACTED_BODY_KEYS);
  }
  return redactQueryString(data, REDACTED_BODY_KEYS);
};

const redactUrl = (url: string | undefined): string | undefined =>
  url === undefined ? url : redactQueryString(url, REDACTED_QUERY_PARAMS);

const loggableBody = (data: unknown): unknown => {
  if (data === undefined || data === null) {
    return data;
  }
  const size = Buffer.isBuffer(data)
    ? data.length
    : Buffer.byteLength(
        typeof data === "string" ? data : util.types.toJSON(data, false),
      );
  return size > DEBUG_BODY_LIMIT_BYTES || Buffer.isBuffer(data)
    ? `<data (${size} bytes)>`
    : data;
};

export const logRequest =
  (
    logger: ActionLogger,
  ): ((request: InternalAxiosRequestConfig) => InternalAxiosRequestConfig) =>
  (request: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    logger.debug(
      util.types.toJSON(
        {
          type: "request",
          method: request.method,
          baseURL: redactUrl(request.baseURL),
          url: redactUrl(request.url),
          params: redactSecrets(request.params, REDACTED_QUERY_PARAMS),
          headers: redactHeaders(request.headers),
          data: loggableBody(redactBody(request.data)),
        },
        true,
        true,
      ),
    );
    return request;
  };

export const logResponse = (
  logger: ActionLogger,
): ((response: AxiosResponse) => AxiosResponse) => {
  const logged = new WeakSet<AxiosResponse>();
  return (response: AxiosResponse): AxiosResponse => {
    if (logged.has(response)) {
      return response;
    }
    logged.add(response);
    logger.debug(
      util.types.toJSON(
        {
          type: "response",
          status: response.status,
          statusText: response.statusText,
          headers: redactHeaders(response.headers),
          data: loggableBody(redactBody(response.data)),
        },
        true,
        true,
      ),
    );
    return response;
  };
};
