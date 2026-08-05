import type { Connection } from "@prismatic-io/spectral";
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
) => {
  validateConnection(connection);
  const applicationKey = getApplicationKeyFromConnection(connection);
  const completeServiceTitanURL = getURLFromConnection(connection, urlType);
  const token = getTokenFromConnection(connection);
  const client = createHttpClient({
    debug: debugRequest,
    baseUrl: completeServiceTitanURL,
    headers: {
      Authorization: `Bearer ${token}`,
      Accepts: "application/json",
      "Content-type": "application/json",
      "ST-App-Key": applicationKey,
    },
  });
  return client;
};
