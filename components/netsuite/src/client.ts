import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/http";
import { oauth, oauthClientCredentials } from "./connections";
import { QUERY_SERVICE, UNAUTHORIZED_STATUS } from "./constants";
import type { RestServiceType } from "./types";
import {
  accountOrigin,
  evictClientCredentialsToken,
  getClientCredentialsToken,
  netSuiteRetryConfig,
} from "./utils";

export const baseUrl = (
  connection: Connection,
  restAPIServiceType: RestServiceType,
): string => {
  const tokenUrl = util.types.toString(connection.fields.tokenUrl);
  return `${accountOrigin(tokenUrl)}/services/rest/${restAPIServiceType}/v1`;
};

export const authorizationHeaders = async (connection: Connection) => {
  if (oauthClientCredentials.key === connection.key) {
    const token = await getClientCredentialsToken(connection);
    return { Authorization: `Bearer ${token}` };
  }
  const token = util.types.toString(connection.token?.access_token);
  if (!token) {
    throw new Error("Did not receive an access token to use.");
  }
  return { Authorization: `Bearer ${token}` };
};

export const createClient = async (
  connection: Connection,
  restAPIServiceType: RestServiceType,
  debug?: boolean,
): Promise<HttpClient> => {
  if (
    oauth.key !== connection.key &&
    oauthClientCredentials.key !== connection.key
  ) {
    throw new ConnectionError(
      connection,
      `Received unexpected connection type: ${connection.key}`,
    );
  }
  const defaultHeaders = {
    ...(await authorizationHeaders(connection)),
    "X-NetSuite-PropertyNameValidation": "Warning",
    "X-NetSuite-PropertyValueValidation": "Warning",
  };

  const client = createHttpClient({
    baseUrl: baseUrl(connection, restAPIServiceType),
    headers:
      restAPIServiceType === QUERY_SERVICE
        ? { ...defaultHeaders, Prefer: "transient" }
        : { ...defaultHeaders },
    responseType: "json",
    debug,
    retryConfig: netSuiteRetryConfig,
  });

  if (oauthClientCredentials.key === connection.key) {
    client.interceptors.response.use(undefined, (error) => {
      if (error?.response?.status === UNAUTHORIZED_STATUS) {
        evictClientCredentialsToken(connection);
      }
      return Promise.reject(error);
    });
  }
  return client;
};
