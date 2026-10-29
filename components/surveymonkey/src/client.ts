import type { Connection } from "@prismatic-io/spectral";
import { getBaseUrl, getAccessToken, validateConnection } from "./util";
import {
  type HttpClient,
  createClient as createHttpClient,
} from "@prismatic-io/spectral/dist/clients/http";

export const createClient = (
  connection: Connection,
  debug: boolean,
): HttpClient => {
  validateConnection(connection);
  const baseUrl = getBaseUrl(connection);
  const accessToken = getAccessToken(connection);

  const client = createHttpClient({
    baseUrl,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    debug,
  });

  return client;
};
