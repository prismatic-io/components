import { type Connection, util } from "@prismatic-io/spectral";
import { validateConnection } from "./connection";

export const getAccessToken = (connection: Connection): string => {
  validateConnection(connection);
  return util.types.toString(connection.token?.access_token);
};

export const getAuthHeaders = (
  connection: Connection,
): Record<string, string> => ({
  Authorization: `Bearer ${getAccessToken(connection)}`,
});
