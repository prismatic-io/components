import { type Connection, ConnectionError } from "@prismatic-io/spectral";
import { apiKeyConnection, oauth2AuthorizationCode } from "../connections/";
export const validateConnection = (connection: Connection): void => {
  if (
    ![apiKeyConnection.key, oauth2AuthorizationCode.key].includes(
      connection.key,
    )
  ) {
    throw new ConnectionError(
      connection,
      `Received unexpected connection type: ${connection.key}`,
    );
  }
};
