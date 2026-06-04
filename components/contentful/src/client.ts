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
import { getAccessToken, getAuthHeaders } from "./util";

export const createClient = (
  connection: Connection,
  context?: ActionContext,
): ClientAPI => {
  return createContentfulClient({
    accessToken: getAccessToken(connection),
    requestLogger(request) {
      if (context?.debug?.enabled) {
        context.logger.debug(request);
      }
    },
  });
};

export const createApiClient = (
  connection: Connection,
  debug = false,
  baseUrl = API_BASE_URL,
): HttpClient => {
  return createAxiosClient({
    baseUrl,
    headers: getAuthHeaders(connection),
    debug,
  });
};
