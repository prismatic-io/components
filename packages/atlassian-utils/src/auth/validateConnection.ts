import { type Connection, ConnectionError } from "@prismatic-io/spectral";
import type { AtlassianConnectionKeys } from "../interfaces/AtlassianConnectionKeys";

export const validateAtlassianConnection = (
  connection: Connection,
  keys: AtlassianConnectionKeys,
): void => {
  const known = [keys.oauth2, keys.basic, keys.clientCredentials].filter(
    (k): k is string => Boolean(k),
  );
  if (!known.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection type: ${connection.key}`,
    );
  }
};
