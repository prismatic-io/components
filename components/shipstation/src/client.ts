import type { Connection } from "@prismatic-io/spectral";
import { ConnectionError } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { shipStationConnection } from "./connections";
import { BASE_URL, INVALID_CONNECTION_ERROR } from "./constants";

export const validateConnection = (connection: Connection) => {
  if (
    !connection.fields.apiKey ||
    !connection.fields.apiSecret ||
    connection.key !== shipStationConnection.key
  ) {
    throw new ConnectionError(connection, INVALID_CONNECTION_ERROR);
  }
};

export const getAuthorization = (connection: Connection) => {
  const { apiKey, apiSecret } = connection.fields;

  const basicAuth = `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString(
    "base64",
  )}`;

  return basicAuth;
};

export const createShipStationClient = (
  connection: Connection,
  debugRequest = false,
) => {
  validateConnection(connection);

  const shipStationClient = createHttpClient({
    debug: debugRequest,
    baseUrl: BASE_URL,
    headers: {
      Authorization: getAuthorization(connection),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return shipStationClient;
};
