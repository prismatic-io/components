import type { Connection } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { serviceTitanConnection } from "./connections";
import {
  getApplicationKeyFromConnection,
  getTokenFromConnection,
  getURLFromConnection,
} from "./util";

export const validateConnection = (connection: Connection) => {
  if (connection.key !== serviceTitanConnection.key) {
    throw new Error("Connection is not authorized");
  }
};

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
