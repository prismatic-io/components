import type { Connection } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { getAuthHeaders, getBaseUrl, validConnection } from "./util";

export const createClient = (connection: Connection, debug = false): HttpClient => {
  validConnection(connection);

  const client = createHttpClient({
    baseUrl: getBaseUrl(connection),
    debug,
    headers: getAuthHeaders(connection),
  });

  return client;
};
