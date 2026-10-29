import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { GetClient } from "./types";
import { getBaseUrl } from "./utils/getBaseUrl";
import { getConnectionHeaders } from "./utils/getConnectionHeaders";
import { validateConnection } from "./utils/validateConnection";

export const createClient = ({ connection, debug }: GetClient) => {
  validateConnection(connection);

  return createHttpClient({
    baseUrl: getBaseUrl(connection.fields.domain),
    headers: getConnectionHeaders(connection),
    debug,
  });
};
