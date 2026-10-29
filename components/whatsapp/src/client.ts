import type { Connection } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { GRAPH_API_URL } from "./constants";
import { validateConnection } from "./util";

export const getClient = (
  connection: Connection,
  debug: boolean,
): HttpClient => {
  validateConnection(connection);
  const token = connection.fields.accessToken;
  return createHttpClient({
    baseUrl: GRAPH_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    debug,
  });
};
