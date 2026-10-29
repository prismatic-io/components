import type { Connection } from "@prismatic-io/spectral";
import { ConnectionError, util } from "@prismatic-io/spectral";
import { oauthClientCredentials } from "../connections";
import { GRAPH_API_VERSION, GRAPH_BASE_URL } from "../constants";

export const isClientCredentials = (connection: Connection): boolean =>
  connection.key === oauthClientCredentials.key;

export const computeEndpointBasedOnConnection = (
  connection: Connection,
  endpoint: string,
): string => {
  if (!isClientCredentials(connection)) {
    return endpoint;
  }

  const userId = util.types.toString(connection.fields.userId);
  if (!userId) {
    throw new ConnectionError(
      connection,
      "The client credentials connection requires a User ID, because a token issued without a signed-in user cannot resolve /me paths.",
    );
  }

  return endpoint.replace(/^\/me(?=\/|$)/, `/users/${userId}`);
};

export const graphBaseUrl = (connection: Connection): string =>
  `${util.types.toString(connection.fields.baseUrl) || GRAPH_BASE_URL}/${GRAPH_API_VERSION}`;

export const validateConnection = (connection: Connection): void => {
  if (!connection?.token?.access_token) {
    throw new ConnectionError(
      connection,
      "No access token was found on the connection. Reauthorize the Microsoft Planner connection and try again.",
    );
  }
};
