import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { validateConnection } from "./connection";
export const getAccessToken = (connection: Connection): string => {
  validateConnection(connection);
  const accessToken = connection.token?.access_token;
  if (!accessToken) {
    throw new ConnectionError(
      connection,
      "The connection has no access token. Reauthorize the connection.",
    );
  }
  return util.types.toString(accessToken);
};
export const getAuthHeaders = (
  connection: Connection,
): Record<string, string> => ({
  Authorization: `Bearer ${getAccessToken(connection)}`,
});
