import type { Connection } from "@prismatic-io/spectral";
import {
  type HttpClient,
  createClient as createAxiosClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { getBaseUrl, validateConnection } from "./util";

export const createClient = (
  connection: Connection,
  debug: boolean,
  useBeta = false,
): HttpClient => {
  validateConnection(connection);

  return createAxiosClient({
    baseUrl: getBaseUrl(useBeta),
    headers: {
      Authorization: `Bearer ${connection.token?.access_token}`,
    },
    debug,
  });
};
