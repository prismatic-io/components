import type { Connection } from "@prismatic-io/spectral";
import {
  createClient as createAxiosClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { API_URL } from "./constants";
import { validateConnection } from "./util";

export const createClient = (
  connection: Connection,
  debug: boolean,
): HttpClient => {
  validateConnection(connection);

  return createAxiosClient({
    baseUrl: API_URL,
    headers: {
      Authorization: `Bearer ${connection.token?.access_token}`,
    },
    debug,
  });
};
