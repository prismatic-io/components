import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import {
  ARENA_LOGIN_PATH,
  CONTENT_TYPE_HEADER,
  JSON_CONTENT_TYPE,
  UNKNOWN_ERROR_MESSAGE,
} from "../constants";
import type { ArenaAuthContext, LoginRequest, LoginResponse } from "../types";
import { getArenaApiBaseUrl } from "./arenaApiUrl";
import { readPersistedAuth, writePersistedAuth } from "./authPersistence";
import { isCredentialRejection, parseAuthErrorMessage } from "./errorHandling";
import {
  generatePlatformAuthHeader,
  PLATFORM_AUTH_HEADER,
} from "./platformAuth";
export const performArenaLogin = async (
  context: ArenaAuthContext,
  connection: Connection,
): Promise<string> => {
  if (!connection?.fields?.email || !connection?.fields?.password) {
    throw new ConnectionError(
      connection,
      "Email and password are required for login",
    );
  }
  const persistedSession = readPersistedAuth(context, connection);
  if (persistedSession) {
    return persistedSession;
  }
  const loginClient = createClient({
    baseUrl: getArenaApiBaseUrl(connection),
    headers: {
      [CONTENT_TYPE_HEADER]: JSON_CONTENT_TYPE,
      [PLATFORM_AUTH_HEADER]: generatePlatformAuthHeader(),
    },
  });
  const loginRequest: LoginRequest = {
    email: util.types.toString(connection.fields.email),
    password: util.types.toString(connection.fields.password),
  };
  if (connection.fields.workspaceId) {
    loginRequest.workspaceId = util.types.toNumber(
      connection.fields.workspaceId,
    );
  }
  try {
    const response = await loginClient.post<LoginResponse>(
      ARENA_LOGIN_PATH,
      loginRequest,
    );
    const sessionId =
      response.data?.arena_session_id ?? response.data?.arenaSessionId;
    if (!sessionId) {
      throw new ConnectionError(
        connection,
        "Login failed: No session ID returned",
      );
    }
    writePersistedAuth(context, connection, sessionId);
    return sessionId;
  } catch (error: unknown) {
    if (isCredentialRejection(error)) {
      throw new ConnectionError(
        connection,
        `Arena login failed: ${parseAuthErrorMessage(error, "Authentication failed")}`,
      );
    }
    throw new ConnectionError(
      connection,
      `Arena login error: ${parseAuthErrorMessage(error, UNKNOWN_ERROR_MESSAGE)}`,
    );
  }
};
export const readOAuthToken = (connection: Connection): string => {
  const accessToken = util.types.toString(connection.token?.access_token);
  if (!accessToken) {
    throw new ConnectionError(
      connection,
      "The connection does not contain a valid OAuth access token.",
    );
  }
  return accessToken;
};
export const readApiKey = (connection: Connection): string => {
  if (!connection?.fields?.apiKey) {
    throw new ConnectionError(connection, "API Key is required");
  }
  return util.types.toString(connection.fields.apiKey);
};
