import type { Connection } from "@prismatic-io/spectral";
import {
  createClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { API_VERSION } from "./constants";
import { getAuthHeaders, getBaseUrl, validateConnection } from "./util";
export const resolveConnectionConfig = (
  connection: Connection,
  version = API_VERSION,
): {
  baseUrl: string;
  headers: Record<string, string>;
} => {
  validateConnection(connection);
  return {
    baseUrl: getBaseUrl(version),
    headers: getAuthHeaders(connection),
  };
};
export const createHttpClient = (
  connection: Connection,
  debug = false,
  version = API_VERSION,
): HttpClient => {
  const { baseUrl, headers } = resolveConnectionConfig(connection, version);
  const client = createClient({
    baseUrl,
    headers: {
      Accept: "application/json",
      ...headers,
    },
    responseType: "json",
    debug,
  });
  return client;
};
