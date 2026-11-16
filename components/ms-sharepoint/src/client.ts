import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient as createHttpClient, type HttpClient } from "@prismatic-io/spectral/http";
import connections from "./connections";
import { BASE_URL } from "./constants";
import { getAccessToken } from "./util";

export const validateConnection = (connection: Connection): void => {
  const connectionKeys = connections.map((c) => c.key);
  if (!connectionKeys.includes(connection.key)) {
    throw new ConnectionError(connection, `Unsupported connection method ${connection.key}.`);
  }
};

export const graphBaseUrl = (connection: Connection): string =>
  `${util.types.toString(connection.fields.baseUrl) || BASE_URL}/v1.0`;

export const createClient = async (connection: Connection, debug = false): Promise<HttpClient> => {
  validateConnection(connection);

  const baseUrl = graphBaseUrl(connection);

  const accessToken = await getAccessToken(connection);

  if (!accessToken) {
    throw new ConnectionError(connection, "Received a Connection without a valid access token.");
  }

  const client = createHttpClient({
    baseUrl,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
    responseType: "json",
    debug,
  });

  return client;
};
