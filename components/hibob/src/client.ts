import type { Connection } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { getAuthHeaders, getBaseUrl } from "./util";

export const getClient = (
  connection: Connection,
  debug: boolean,
): HttpClient => {
  return createHttpClient({
    baseUrl: getBaseUrl(connection),
    headers: getAuthHeaders(connection),
    debug,
  });
};
