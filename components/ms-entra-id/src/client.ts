import { type Connection, util } from "@prismatic-io/spectral";
import {
  createClient as createAxiosClient,
  type HttpClient,
} from "@prismatic-io/spectral/http";
import { API_URL } from "./constants";
import { validateConnection } from "./util";

export const createClient = (
  connection: Connection,
  debug = false,
): HttpClient => {
  validateConnection(connection);

  return createAxiosClient({
    baseUrl: API_URL,
    responseType: "json",
    headers: {
      Authorization: `Bearer ${util.types.toString(connection.token?.access_token)}`,
      Accept: "application/json",
    },
    debug,
  });
};
