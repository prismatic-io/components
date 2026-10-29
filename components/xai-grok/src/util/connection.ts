import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import connections from "../connections";

export const validateConnection = (connection: Connection): void => {
  const connectionKeys = connections.map((c) => c.key);

  if (!connectionKeys.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection ${connection.key}.`,
    );
  }
};

export const getToken = (connection: Connection): string => {
  const token = util.types.toString(connection.fields.token);
  if (!token) {
    throw new ConnectionError(connection, "API token is required");
  }
  return token;
};
