import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { GraphQLClient } from "graphql-request";
import { apiKey, oauth } from "./connections";
import { CURRENT_API_VERSION } from "./constants";

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
  debug: boolean,
  apiVersion = CURRENT_API_VERSION,
) => {
  const accessToken = getAccessToken(connection);
  const client = new GraphQLClient("https://api.monday.com/v2", {
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${accessToken}`,
      "API-Version": apiVersion,
    },
    requestMiddleware: (request) => {
      if (debug) {
        console.log({ request });
      }
      return request;
    },
    responseMiddleware: (response) => {
      if (debug) {
        console.log({ response });
      }
    },
  });
  return client;
};
