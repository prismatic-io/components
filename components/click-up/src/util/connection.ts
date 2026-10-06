import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import connections from "../connections";
export const validateConnection = (connection: Connection): void => {
  if (!connections.some(({ key }) => key === connection?.key)) {
    throw new ConnectionError(
      connection,
      `Received unexpected connection type: ${connection?.key}`,
    );
  }
};
export const getBearerToken = (connection: Connection): string =>
  util.types.toString(
    connection.token?.access_token || connection.fields?.apiKey,
  );
