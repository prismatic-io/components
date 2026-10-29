import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import connections from "../connections";

export const validateConnection = (connection: Connection): string => {
  const connectionKeys = connections.map((c) => c.key);

  if (!connectionKeys.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection ${connection.key}.`,
    );
  }

  return util.types.toString(connection.fields.apiKey);
};
