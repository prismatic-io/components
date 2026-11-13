import { type Connection, util } from "@prismatic-io/spectral";
import { createClient, type HttpClient } from "@prismatic-io/spectral/http";
import { BASE_URL, DEFAULT_TIMEOUT } from "./constants";
import { getAuthHeaders, validateConnection } from "./util";

export const getOneDriveClient = (
  connection: Connection,
  debug = false,
  timeout?: number,
): HttpClient => {
  validateConnection(connection);
  const headers = getAuthHeaders(connection);

  const oneDriveClient = createClient({
    baseUrl: BASE_URL,
    headers: {
      ...headers,
      Accept: "application/json",
      "Content-type": "application/json",
    },
    responseType: "json",
    timeout: util.types.toInt(timeout, DEFAULT_TIMEOUT),
    debug,
  });

  return oneDriveClient;
};
