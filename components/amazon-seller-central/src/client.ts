import { type Connection, ConnectionError } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { amazonClientCredentials, amazonOauth } from "./connections";
import { getAccessToken, getBaseUrl, getHeaders } from "./util";

export const validateConnection = (connection: Connection) => {
  if (
    connection.key === amazonOauth.key ||
    connection.key === amazonClientCredentials.key
  ) {
    if (!connection.token.access_token) {
      throw new ConnectionError(
        connection,
        "Received valid Connection type but did not find valid access_token.",
      );
    }
  } else {
    throw new ConnectionError(connection, "Unknown Connection type provided.");
  }
};

export const createClient = (connection: Connection, debug = false) => {
  validateConnection(connection);
  const accessToken = getAccessToken(connection);
  const baseUrl = getBaseUrl(connection);

  return createHttpClient({
    baseUrl: `https://${baseUrl}`,
    headers: getHeaders(baseUrl, accessToken),
    debug,
  });
};
