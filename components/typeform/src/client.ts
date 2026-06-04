import type { Connection } from "@prismatic-io/spectral";
import { getAuthorizationHeaders } from "./util";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { BASE_URL } from "./constants";

export const createClient = (connection: Connection, debug: boolean) => {
  const headers = getAuthorizationHeaders(connection);

  const client = createHttpClient({
    baseUrl: BASE_URL,
    debug,
    headers,
  });

  return client;
};
