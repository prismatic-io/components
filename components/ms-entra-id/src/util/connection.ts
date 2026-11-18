import { type Connection, ConnectionError } from "@prismatic-io/spectral";
import { CONNECTION_KEYS } from "../constants";

export const validateConnection = (connection: Connection): void => {
  if (!CONNECTION_KEYS.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection method ${connection.key}.`,
    );
  }
};
