import { type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { ssvApiKeyConnection } from "../connections/ssvApiKeyConnection";
import type {
  AuthResponse,
  CachedTokens,
  CrossFlowState,
  RefreshTokenResponse,
} from "../types";
import { getBaseUrl } from "./getBaseUrl";

const getCacheKey = (baseUrl: string, email: string): string =>
  `${baseUrl}:${email}`;


const authenticate = async (
  baseUrl: string,
  email: string,
  password: string,
  debug = false,
): Promise<CachedTokens> => {
  const authClient = createClient({
    debug,
    baseUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const { data } = await authClient.post("/v3/auth", {
    email,
    password,
    force_login: true,
  });
  const { token, refresh_token } = data as AuthResponse;

  return { token, refreshToken: refresh_token };
};


const refreshAccessToken = async (
  baseUrl: string,
  refreshToken: string,
  debug = false,
): Promise<CachedTokens> => {
  const authClient = createClient({
    debug,
    baseUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const { data } = await authClient.post("/v3/auth/refresh_token", {
    refresh_token: refreshToken,
  });
  const { token, refresh_token } = data as RefreshTokenResponse;

  return { token, refreshToken: refresh_token };
};






export const getToken = async (
  ssvConnection: Connection,
  crossFlowState: CrossFlowState,
  debug = false,
): Promise<string> => {
  if (ssvConnection.key === ssvApiKeyConnection.key) {
    return util.types.toString(ssvConnection.fields.apiKey);
  }

  const baseUrl = getBaseUrl(ssvConnection);
  const { email, password } = ssvConnection.fields;
  const emailStr = util.types.toString(email);
  const passwordStr = util.types.toString(password);

  if (!emailStr || !passwordStr) {
    throw new Error("Email and password are required for authentication.");
  }

  const cacheKey = getCacheKey(baseUrl, emailStr);
  const cached = crossFlowState[cacheKey] as CachedTokens | undefined;

  if (cached) {
    return cached.token;
  }

  const tokens = await authenticate(baseUrl, emailStr, passwordStr, debug);
  crossFlowState[cacheKey] = tokens;
  return tokens.token;
};





export const refreshCachedToken = async (
  ssvConnection: Connection,
  crossFlowState: CrossFlowState,
  debug = false,
): Promise<string> => {
  if (ssvConnection.key === ssvApiKeyConnection.key) {
    return util.types.toString(ssvConnection.fields.apiKey);
  }

  const baseUrl = getBaseUrl(ssvConnection);
  const { email, password } = ssvConnection.fields;
  const emailStr = util.types.toString(email);
  const passwordStr = util.types.toString(password);
  const cacheKey = getCacheKey(baseUrl, emailStr);

  const cached = crossFlowState[cacheKey] as CachedTokens | undefined;

  if (cached) {
    try {
      const refreshed = await refreshAccessToken(
        baseUrl,
        cached.refreshToken,
        debug,
      );
      crossFlowState[cacheKey] = refreshed;
      return refreshed.token;
    } catch {
      
    }
  }

  const tokens = await authenticate(baseUrl, emailStr, passwordStr, debug);
  crossFlowState[cacheKey] = tokens;
  return tokens.token;
};
