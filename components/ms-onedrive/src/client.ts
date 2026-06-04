import {
  createClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { type Connection, util } from "@prismatic-io/spectral/dist/";
import { BASE_URL } from "./constants";
import { getAuthHeaders, validateConnection } from "./util";

export const getOneDriveClient = (
  connection: Connection,
  debug: boolean,
  timeout?: string,
): HttpClient => {
  validateConnection(connection);
  const headers = getAuthHeaders(connection);

  const oneDriveClient = createClient({
    baseUrl: BASE_URL,
    headers: {
      ...headers,
      Accepts: "application/json",
      "Content-type": "application/json",
    },
    timeout: util.types.toInt(timeout, 4000),
    debug,
  });

  return oneDriveClient;
};
