import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { oauth } from "../connections";

export const getAuthHeaders = (connection: Connection) => {
  const token = util.types.toString(connection?.token?.access_token);
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
