import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { getAccessToken, validateConnection } from "./utils";
import { BASE_URL } from "./constants";

export const createClient = async (connection: Connection, debug: boolean): Promise<HttpClient> => {
  validateConnection(connection);

  const baseUrl = `${util.types.toString(connection.fields.baseUrl) || BASE_URL}/v1.0`;

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
