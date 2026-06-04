import { type Connection, ConnectionError } from "@prismatic-io/spectral";
import connections from "../connections";

export const validateConnection = (connection: Connection) => {
  if (!connections.map((ssv) => ssv.key).includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection type: ${connection.key}`,
    );
  }
};
