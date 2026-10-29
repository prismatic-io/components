import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { apiKey, oauth } from "./connections";
import { BASE_URL, EVENTS_URL } from "./constants";

const toAuthorizationHeaders = (
  connection: Connection,
): { Authorization: string } => {
  if (connection.key === apiKey.key) {
    if (!connection.fields?.apiKey) {
      throw new ConnectionError(
        connection,
        "Received valid Connection type but did not receive a valid API key.",
      );
    }
    const myApiKey = util.types.toString(connection.fields?.apiKey);
    return { Authorization: `Token token=${myApiKey}` };
  }

  if (connection.key === oauth.key) {
    if (!connection.token?.access_token) {
      throw new ConnectionError(
        connection,
        "Received valid Connection type but did not receive a valid access token.",
      );
    }
    return { Authorization: `Bearer ${connection.token.access_token}` };
  }
  throw new ConnectionError(connection, "Unknown Connection type provided.");
};

export const createClient = (
  connection: Connection,
  debug = false,
): HttpClient => {
  if (![apiKey.key, oauth.key].includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Received unexpected connection type: ${connection.key}`,
    );
  }

  return createHttpClient({
    baseUrl: BASE_URL,
    debug,
    headers: {
      ...toAuthorizationHeaders(connection),
      Accept: "application/vnd.pagerduty+json;version=2",
    },
    responseType: "json",
  });
};

export const createEventsClient = (debug: boolean): HttpClient => {
  return createHttpClient({
    baseUrl: EVENTS_URL,
    debug,
    responseType: "json",
  });
};
