import type { Connection } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { getBaseUrl, getHeaders, validateConnection } from "./util";

export const createClient = (
  connection: Connection,
  debug: boolean,
): HttpClient => {
  validateConnection(connection);
  const baseUrl = getBaseUrl(connection);
  const headers = getHeaders(connection);

  const client = createHttpClient({
    baseUrl,
    headers,
    responseType: "json",
    debug,
  });

  return client;
};
