import { type Connection, ConnectionError } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { adobeIOConnection } from "./connections";
import { API_BASE_URL } from "./constants";

export const validateConnection = (connection: Connection) => {
  if (connection.key !== adobeIOConnection.key) {
    throw new ConnectionError(connection, "Unknown Connection type provided.");
  }

  if (!connection.token?.access_token) {
    throw new ConnectionError(
      connection,
      "Received valid Connection type but did not find valid access token.",
    );
  }
};

export const getClient = (connection: Connection, debug: boolean) => {
  validateConnection(connection);
  return createClient({
    baseUrl: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${connection.token?.access_token}`,
      "x-api-key": `${connection.fields.clientId}`,
      Accept: "application/hal+json",
    },
    debug,
  });
};
