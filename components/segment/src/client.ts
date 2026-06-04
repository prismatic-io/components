import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { apiKey, segmentOAuth } from "./connections";

export const validateConnection = (connection: Connection) => {
  if (connection.key !== apiKey.key && connection.key !== segmentOAuth.key) {
    throw new ConnectionError(connection, "Unknown Connection type provided.");
  }

  if (
    !connection.fields.apiKey &&
    !connection.fields.subdomain &&
    !connection.fields.clientId &&
    !connection.fields.clientSecret
  ) {
    throw new ConnectionError(
      connection,
      "Received valid Connection type but did not find valid api key or account name.",
    );
  }
};

export const getHeaders = (connection: Connection) => {
  if (connection.key === apiKey.key) {
    const { subdomain, apiKey } = connection.fields;
    if (!subdomain || !apiKey) {
      throw new ConnectionError(
        connection,
        "Received valid Connection type but did not find valid api key or account name.",
      );
    }
    return {
      Authorization: `Bearer ${util.types.toString(apiKey)}`,
    };
  }

  if (connection.key === segmentOAuth.key) {
    const { accessToken } = connection.fields;
    if (!accessToken) {
      throw new ConnectionError(
        connection,
        "Received valid Connection type but did not find valid access token.",
      );
    }
    return {
      Authorization: `Bearer ${util.types.toString(accessToken)}`,
    };
  }

  throw new ConnectionError(connection, "Unknown Connection type provided.");
};

export const createClient = (
  connection: Connection,
  region: string,
  debug: boolean,
) => {
  validateConnection(connection);
  const headers = getHeaders(connection);
  const baseUrl = `https://${region}.segmentapis.com/`;

  const client = createHttpClient({
    baseUrl,
    headers,
    debug,
  });
  return client;
};
