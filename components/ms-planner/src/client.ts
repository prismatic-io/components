import type { Connection } from "@prismatic-io/spectral";
import { util } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { graphBaseUrl, validateConnection } from "./utils";
export const createClient = (
  connection: Connection,
  debug = false,
): HttpClient => {
  validateConnection(connection);
  return createHttpClient({
    baseUrl: graphBaseUrl(connection),
    headers: {
      Authorization: `Bearer ${util.types.toString(connection.token?.access_token)}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    debug,
    responseType: "json",
  });
};
