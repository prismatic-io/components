import type { Connection } from "@prismatic-io/spectral";
import type { ArenaAuthContext, PersistedArenaAuth } from "../types";
const getAuthStateKey = (connection: Connection): string =>
  `Arena - ${connection.configVarKey}`;
export const readPersistedAuth = (
  context: ArenaAuthContext,
  connection: Connection,
): string | undefined => {
  if (!context.executionState) {
    return undefined;
  }
  const persisted = context.executionState[getAuthStateKey(connection)] as
    | PersistedArenaAuth
    | undefined;
  return persisted?.credential;
};
export const writePersistedAuth = (
  context: ArenaAuthContext,
  connection: Connection,
  credential: string,
): void => {
  if (!context.executionState) {
    return;
  }
  const persisted: PersistedArenaAuth = { credential };
  context.executionState[getAuthStateKey(connection)] = persisted;
};
export const clearPersistedAuth = (
  context: ArenaAuthContext,
  connection: Connection,
): void => {
  if (!context.executionState) {
    return;
  }
  delete context.executionState[getAuthStateKey(connection)];
};
