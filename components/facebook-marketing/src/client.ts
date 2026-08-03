import type { Connection } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { DEFAULT_VERSION } from "./constants";
import { getAuthHeaders, getBaseUrl, validateConnection } from "./util";
export const createClient = (
  connection: Connection,
  debug: boolean,
  version = DEFAULT_VERSION,
): HttpClient => {
  validateConnection(connection);
  const baseUrl = getBaseUrl(version);
  const headers = getAuthHeaders(connection);
  return createHttpClient({
    baseUrl,
    headers,
    debug,
  });
};
