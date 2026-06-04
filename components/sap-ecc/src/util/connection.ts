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

export const getBasicAuthHeader = (connection: Connection): string => {
  const username = util.types.toString(connection.fields.username);
  const password = util.types.toString(connection.fields.password);
  const encoded = Buffer.from(`${username}:${password}`).toString("base64");
  return `Basic ${encoded}`;
};
