import {
  type HttpClient,
  createClient as createHttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import type { AuthorizationType } from "./types/AuthorizationType";
import { getAuthorization, validateConnection } from "./util";
import type { Connection } from "@prismatic-io/spectral";

export const createClient = (
  region: string,
  connection: Connection,
  authorizationType: AuthorizationType,
  debug: boolean,
): HttpClient => {
  validateConnection(connection);
  const authorization = getAuthorization(authorizationType, connection);
  const client = createHttpClient({
    baseUrl: `https://${region}.mixpanel.com`,
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json",
    },
    debug,
  });
  return client;
};
export const createNoAuthClient = (
  region: string,
  connection: Connection,
  debug: boolean,
): HttpClient => {
  validateConnection(connection);
  const client = createHttpClient({
    baseUrl: `https://${region}.mixpanel.com`,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    debug,
  });
  return client;
};

export const createMixpanelClient = (
  regionAndDomain: string,
  connection: Connection,
  authorizationType: AuthorizationType,
  debug: boolean,
): HttpClient => {
  validateConnection(connection);
  const authorization = getAuthorization(authorizationType, connection);
  const client = createHttpClient({
    baseUrl: `https://${regionAndDomain}.com/api/2.0/`,
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json",
    },
    debug,
  });
  return client;
};

export const createDataClient = (
  dataAndDomain: string,
  connection: Connection,
  authorizationType: AuthorizationType,
  debug: boolean,
): HttpClient => {
  validateConnection(connection);
  const authorization = getAuthorization(authorizationType, connection);
  const client = createHttpClient({
    baseUrl: `https://${dataAndDomain}.mixpanel.com/api/2.0/`,
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json",
    },
    debug,
  });
  return client;
};
