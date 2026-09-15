import type { Connection } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import {
  getApplicationKeyFromConnection,
  getTokenFromConnection,
  getURLFromConnection,
  validateConnection,
} from "./util";
export const createClient = (
  connection: Connection,
  urlType: string,
  debugRequest = false,
): HttpClient => {
  validateConnection(connection);
  const applicationKey = getApplicationKeyFromConnection(connection);
  const completeServiceTitanURL = getURLFromConnection(connection, urlType);
  const token = getTokenFromConnection(connection);
  const client = createHttpClient({
    debug: debugRequest,
    baseUrl: completeServiceTitanURL,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-type": "application/json",
      "ST-App-Key": applicationKey,
    },
  });
  return client;
};
