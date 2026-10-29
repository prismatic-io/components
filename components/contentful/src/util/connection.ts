import { type Connection, ConnectionError } from "@prismatic-io/spectral";
import { contentfulOauth2Connection } from "../connections";

export const validateConnection = (connection: Connection): void => {
  if (![contentfulOauth2Connection.key].includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection method ${connection.key}.`,
    );
  }
};
