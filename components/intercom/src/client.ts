import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { accessTokenAuth, intercomConnection } from "./connections";

export const baseUrl = "https://api.intercom.io/";

export const validateConnection = (connection: Connection): void => {
  if (
    connection.key !== intercomConnection.key &&
    connection.key !== accessTokenAuth.key
  ) {
    throw new ConnectionError(
      connection,
      "Received unexpected connection type",
    );
  }
};

export const getAccessToken = (connection: Connection): string => {
  validateConnection(connection);

  const ERROR_MESSAGE =
    "Did not receive a connection containing an access token.";
  const isIntercomConnection = connection.key === intercomConnection.key;
  const isAccessTokenAuth = connection.key === accessTokenAuth.key;

  if (isIntercomConnection || isAccessTokenAuth) {
    const accessToken = isIntercomConnection
      ? connection.token?.access_token
      : connection.fields.accessToken;

    if (!accessToken) {
      throw new ConnectionError(connection, ERROR_MESSAGE);
    }

    return util.types.toString(accessToken);
  }

  throw new ConnectionError(connection, ERROR_MESSAGE);
};

export const getClientProps = (
  connection: Connection,
): { accessToken: string; baseUrl: string } => {
  const accessToken = getAccessToken(connection);

  return {
    accessToken,
    baseUrl,
  };
};

export const createClient = (
  connection: Connection,
  debug: boolean,
): HttpClient => {
  const accessToken = getAccessToken(connection);

  return createHttpClient({
    baseUrl,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
    responseType: "json",
    debug,
  });
};
