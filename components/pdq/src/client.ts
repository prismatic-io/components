import type { Connection } from "@prismatic-io/spectral";
import {
  createClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { getAuthHeaders, getBaseUrl, validateConnection } from "./util";

export const createHttpClient = (
  connection: Connection,
  debug: boolean,
  version = "v1",
): HttpClient => {
  validateConnection(connection);
  const baseUrl = getBaseUrl(version);
  const headers = getAuthHeaders(connection);
  const client = createClient({
    baseUrl,
    headers,
    debug,
  });
  return client;
};
