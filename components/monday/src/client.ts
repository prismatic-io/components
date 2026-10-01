import {
  type ActionLogger,
  type Connection,
  ConnectionError,
  util,
} from "@prismatic-io/spectral";
import { GraphQLClient } from "graphql-request";
import { apiKey, oauth } from "./connections";
import { API_BASE_URL, CURRENT_API_VERSION } from "./constants";
const getAccessToken = (connection: Connection): string => {
  if (connection.key === apiKey.key) {
    return util.types.toString(connection.fields.apiKey);
  }
  if (connection.key === oauth.key) {
    if (!connection.token?.access_token) {
      throw new ConnectionError(
        connection,
        "Received valid Connection type but did not receive a valid access token.",
      );
    }
    return util.types.toString(connection.token.access_token);
  }
  throw new ConnectionError(connection, "Unknown Connection type provided.");
};
export const getMondayClient = (
  connection: Connection,
  debug = false,
  logger?: ActionLogger,
  apiVersion = CURRENT_API_VERSION,
): GraphQLClient => {
  const accessToken = getAccessToken(connection);
  const client = new GraphQLClient(API_BASE_URL, {
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${accessToken}`,
      "API-Version": apiVersion,
    },
    requestMiddleware: (request) => {
      if (debug) {
        logger?.debug(JSON.stringify({ request }));
      }
      return request;
    },
    responseMiddleware: (response) => {
      if (debug) {
        logger?.debug(JSON.stringify({ response }));
      }
    },
  });
  return client;
};
