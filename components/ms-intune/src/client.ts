import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import {
  createClient as createAxiosClient,
  type HttpClient,
} from "@prismatic-io/spectral/http";
import { msIntuneClientCredentials, msIntuneOAuth2 } from "./connections";
import { getBaseUrl } from "./util";

export const validateConnection = (connection: Connection): void => {
  if (
    ![msIntuneOAuth2.key, msIntuneClientCredentials.key].includes(
      connection.key,
    )
  ) {
    throw new ConnectionError(
      connection,
      `Unsupported connection method ${connection.key}.`,
    );
  }
};

export const getAuthHeaders = (
  connection: Connection,
): Record<string, string> => {
  validateConnection(connection);
  const accessToken = util.types.toString(connection.token?.access_token);
  if (!accessToken) {
    throw new ConnectionError(
      connection,
      "The connection has no access token. Reauthenticate the connection.",
    );
  }
  return { Authorization: `Bearer ${accessToken}` };
};

export const createClient = (
  connection: Connection,
  debug = false,
  useBeta = false,
): HttpClient =>
  createAxiosClient({
    baseUrl: getBaseUrl(useBeta),
    headers: getAuthHeaders(connection),
    debug,
  });
