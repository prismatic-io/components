import { arenaApiKey, arenaOAuth, arenaUsernamePassword } from "../connections";
import { AUTHORIZATION_HEADER, BEARER_PREFIX } from "../constants";
import type { ArenaAuthStrategy } from "../types";
import {
  performArenaLogin,
  readApiKey,
  readOAuthToken,
} from "./arenaCredentials";
export const ARENA_AUTH_STRATEGIES: Record<string, ArenaAuthStrategy> = {
  [arenaUsernamePassword.key]: {
    label: "session",
    renewable: true,
    getCredential: performArenaLogin,
    buildHeaders: (credential) => ({ arena_session_id: credential }),
  },
  [arenaOAuth.key]: {
    label: "OAuth",
    renewable: false,
    getCredential: async (_context, connection) => readOAuthToken(connection),
    buildHeaders: (credential) => ({
      [AUTHORIZATION_HEADER]: `${BEARER_PREFIX} ${credential}`,
    }),
  },
  [arenaApiKey.key]: {
    label: "API key",
    renewable: false,
    getCredential: async (_context, connection) => readApiKey(connection),
    buildHeaders: (credential) => ({ arena_session_id: credential }),
  },
};
