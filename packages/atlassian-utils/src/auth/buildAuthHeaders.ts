import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import type { AtlassianConnectionKeys } from "../interfaces/AtlassianConnectionKeys";

export const buildAuthHeaders = (
  connection: Connection,
  keys: AtlassianConnectionKeys,
): Record<string, string> => {
  if (connection.key === keys.basic) {
    const token = Buffer.from(
      `${util.types.toString(connection.fields.username)}:${util.types.toString(connection.fields.password)}`,
    ).toString("base64");
    return { Authorization: `Basic ${token}` };
  }

  if (
    connection.key === keys.oauth2 ||
    (keys.clientCredentials && connection.key === keys.clientCredentials)
  ) {
    return {
      Authorization: `Bearer ${util.types.toString(connection.token?.access_token)}`,
    };
  }

  throw new ConnectionError(
    connection,
    `Unsupported connection type: ${connection.key}`,
  );
};
