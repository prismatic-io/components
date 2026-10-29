import type { Connection } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { getAuthorization, getBaseUrl, validateConnection } from "./util";

export const getClient = (connection: Connection, debug = false) => {
  validateConnection(connection);
  const baseUrl = getBaseUrl(connection);

  const headers = {
    Authorization: getAuthorization(connection),
    Accepts: "application/json",
    "Content-type": "application/json",
  };

  const client = createClient({
    baseUrl,
    headers,
    debug,
  });

  return client;
};
