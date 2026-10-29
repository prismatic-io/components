import type { Connection } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { API_VERSION } from "./constants";
import type { ApiVersion } from "./types";
import {
  getBaseUrl,
  toAuthorizationHeaders,
  validateConnection,
} from "./utils";

export const createClient = (
  connection: Connection,
  version: ApiVersion = API_VERSION.V1,
  debug = false,
): HttpClient => {
  validateConnection(connection);

  const baseUrl = getBaseUrl(version);

  return createHttpClient({
    baseUrl,
    headers: {
      ...toAuthorizationHeaders(connection),
      Accept: "application/json",
    },
    responseType: "json",
    debug,
  });
};
