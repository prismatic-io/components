import type { Connection } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { getBaseUrl, getToken } from "./util";

export const createClient = (
  connection: Connection,
  serviceUrl: string,
  apiVersion: string,
  debug: boolean,
): HttpClient => {
  const baseUrl = getBaseUrl(connection, serviceUrl, apiVersion);
  const token = getToken(connection);
  const client = createHttpClient({
    baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    debug,
  });
  return client;
};
