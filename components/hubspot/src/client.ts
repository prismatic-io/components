import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { type ClientProps, createClient } from "@prismatic-io/spectral/dist/clients/http";
import { hubspotOAuth, baseUrl as importedBaseUrl, privateAppAccessToken } from "./connections";

export const baseUrl = importedBaseUrl;

interface GetHubspotClientProps {
  hubspotConnection: Connection;
  timeout?: unknown;
  debugRequest?: boolean;
  headers?: Record<string, unknown>;
}

export const validateConnection = (connection: Connection): void => {
  if (connection.key !== hubspotOAuth.key && connection.key !== privateAppAccessToken.key) {
    throw new ConnectionError(connection, "HubSpot connection is required for this action.");
  }
};

const getClientConfiguration = (
  { hubspotConnection, timeout, headers = {}, debugRequest }: GetHubspotClientProps,
  addBearerToken: boolean,
): ClientProps => {
  const toReturn: ClientProps = {
    baseUrl,
    headers: {
      Accept: "application/json",
      timeout: util.types.toNumber(timeout),
      ...headers,
    },
    debug: debugRequest,
  };

  if (addBearerToken) {
    switch (hubspotConnection.key) {
      case privateAppAccessToken.key:
        toReturn.headers.Authorization = `Bearer ${hubspotConnection.fields.accessToken}`;
        break;
      case hubspotOAuth.key:
        toReturn.headers.Authorization = `Bearer ${hubspotConnection.token.access_token}`;
        break;
      default:
        throw new ConnectionError(
          hubspotConnection,
          `Unsupported authorization method ${hubspotConnection.key}.`,
        );
    }
  }

  return toReturn;
};

export const getHubspotClient = (params: GetHubspotClientProps, addBearerToken = true) => {
  validateConnection(params.hubspotConnection);
  const config = getClientConfiguration(params, addBearerToken);
  const client = createClient(config);

  return client;
};
