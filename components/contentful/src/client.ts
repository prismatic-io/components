import type { Connection } from "@prismatic-io/spectral";
import {
  createClient as createAxiosClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import type { ActionContext } from "@prismatic-io/spectral/dist/serverTypes";
import {
  type ClientAPI,
  createClient as createContentfulClient,
} from "contentful-management";
import { API_BASE_URL } from "./constants";
import { getAccessToken, getAuthHeaders, validateConnection } from "./util";
export const createClient = (
  connection: Connection,
  context?: ActionContext,
): ClientAPI => {
  validateConnection(connection);
  return createContentfulClient(
    {
      accessToken: getAccessToken(connection),
      requestLogger(request) {
        if (context?.debug?.enabled) {
          context.logger.debug(request);
        }
      },
    },
    { type: "legacy" },
  );
};
export const createApiClient = (
  connection: Connection,
  debug = false,
  baseUrl = API_BASE_URL,
): HttpClient => {
  validateConnection(connection);
  return createAxiosClient({
    baseUrl,
    headers: getAuthHeaders(connection),
    responseType: "json",
    debug,
  });
};
