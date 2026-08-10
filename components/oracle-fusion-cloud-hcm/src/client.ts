import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import {
  basicAuthConnection,
  oauth2ClientCredentialsConnection,
} from "./connections";
export const validateConnection = (connection: Connection): void => {
  if (
    ![basicAuthConnection.key, oauth2ClientCredentialsConnection.key].includes(
      connection.key,
    )
  ) {
    throw new ConnectionError(
      connection,
      `Unexpected connection type: ${connection.key}`,
    );
  }
};
const getServerUrl = (connection: Connection): string => {
  validateConnection(connection);
  return util.types.toString(connection.fields.serverUrl).replace(/\/$/, "");
};
export const getAuthHeaders = (
  connection: Connection,
): Record<string, string> => {
  if (connection.key === oauth2ClientCredentialsConnection.key) {
    return {
      Authorization: `Bearer ${util.types.toString(connection.token?.access_token)}`,
    };
  }
  if (connection.key === basicAuthConnection.key) {
    const username = util.types.toString(connection.fields.username);
    const password = util.types.toString(connection.fields.password);
    return {
      Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`,
    };
  }
  throw new ConnectionError(
    connection,
    `Unexpected connection type: ${connection.key}`,
  );
};
export const createClient = (
  connection: Connection,
  debug = false,
): HttpClient => {
  const serverUrl = getServerUrl(connection);
  return createHttpClient({
    baseUrl: `${serverUrl}/hcmRestApi/resources/11.13.18.05`,
    headers: {
      ...getAuthHeaders(connection),
      "REST-Framework-Version": "3",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    debug,
  });
};
export const getBaseUrl = (connection: Connection): string =>
  `${getServerUrl(connection)}/hcmRestApi/resources/11.13.18.05`;
export const createAtomFeedClient = (
  connection: Connection,
  debug = false,
): HttpClient => {
  validateConnection(connection);
  return createHttpClient({
    baseUrl: `${getServerUrl(connection)}/hcmRestApi`,
    headers: {
      ...getAuthHeaders(connection),
      Accept: "application/atom+xml, text/xml",
    },
    debug,
  });
};
