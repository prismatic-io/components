import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { oauth } from "../connections";

export const getAuthHeaders = (
  connection: Connection,
): Record<string, string> => {
  const token = util.types.toString(connection?.token?.access_token);
  if (!token) {
    throw new ConnectionError(
      connection,
      "Received a Connection without a valid access token.",
    );
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const validateConnection = (
  connection: Connection,
): connection is Connection => {
  if (connection.key !== oauth.key) {
    throw new ConnectionError(connection, "Unknown Connection type provided.");
  }
  return true;
};
