import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import {
  createClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import {
  ARENA_DEFAULT_TIMEOUT_MS,
  ARENA_LIMIT_RESET_HEADER,
  ARENA_LOW_QUOTA_THRESHOLD,
  ARENA_REQUESTS_REMAINING_HEADER,
  CONNECTION_RESET_CODE,
  CONTENT_TYPE_HEADER,
  JSON_CONTENT_TYPE,
  SOCKET_HANG_UP_MESSAGE,
  UNKNOWN_ERROR_MESSAGE,
} from "./constants";
import type { ArenaAuthContext } from "./types";
import { getArenaApiBaseUrl } from "./util/arenaApiUrl";
import { ARENA_AUTH_STRATEGIES } from "./util/arenaAuthStrategies";
import { clearPersistedAuth } from "./util/authPersistence";
import {
  isSessionExpiredError,
  parseAuthErrorMessage,
} from "./util/errorHandling";
import {
  generatePlatformAuthHeader,
  PLATFORM_AUTH_HEADER,
} from "./util/platformAuth";
export const createArenaClient = async (
  context: ArenaAuthContext,
  connection: Connection,
): Promise<HttpClient> => {
  const strategy = ARENA_AUTH_STRATEGIES[connection.key];
  if (!strategy) {
    throw new ConnectionError(
      connection,
      `Unsupported connection type: ${connection.key}`,
    );
  }
  const baseUrl = getArenaApiBaseUrl(connection);
  const credential = await strategy.getCredential(context, connection);
  const client = createClient({
    baseUrl,
    headers: {
      ...strategy.buildHeaders(credential),
      [CONTENT_TYPE_HEADER]: JSON_CONTENT_TYPE,
    },
    timeout: util.types.toNumber(
      connection.fields.timeout,
      ARENA_DEFAULT_TIMEOUT_MS,
    ),
  });
  client.interceptors.request.use((config) => {
    config.headers[PLATFORM_AUTH_HEADER] = generatePlatformAuthHeader();
    return config;
  });
  client.interceptors.response.use((response) => {
    const remaining = Number(
      response.headers?.[ARENA_REQUESTS_REMAINING_HEADER],
    );
    if (Number.isFinite(remaining) && remaining <= ARENA_LOW_QUOTA_THRESHOLD) {
      const resetsAt = response.headers?.[ARENA_LIMIT_RESET_HEADER];
      context.logger.warn(
        `Arena API quota low: ${remaining} requests remaining for this workspace` +
          `${resetsAt ? `, resets at ${resetsAt}` : ""}.`,
      );
    }
    return response;
  });
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        (error.code === CONNECTION_RESET_CODE ||
          error.message === SOCKET_HANG_UP_MESSAGE) &&
        originalRequest &&
        !originalRequest._retryConn
      ) {
        originalRequest._retryConn = true;
        return client.request(originalRequest);
      }
      return Promise.reject(error);
    },
  );
  if (strategy.renewable) {
    client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (isSessionExpiredError(error) && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            clearPersistedAuth(context, connection);
            const renewedHeaders = strategy.buildHeaders(
              await strategy.getCredential(context, connection),
            );
            Object.assign(client.defaults.headers, renewedHeaders);
            Object.assign(originalRequest.headers, renewedHeaders);
            return client.request(originalRequest);
          } catch (authError: unknown) {
            throw new ConnectionError(
              connection,
              `${strategy.label} expired and re-authentication failed: ${parseAuthErrorMessage(authError, UNKNOWN_ERROR_MESSAGE)}`,
            );
          }
        }
        return Promise.reject(error);
      },
    );
  }
  return client;
};
