import type { Connection } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { getClientConfig } from "./util";
export const createFreshserviceClient = (
  connection: Connection,
  options: {
    debug: boolean;
  },
) => {
  const { baseUrl, authorization } = getClientConfig(connection);
  return createHttpClient({
    baseUrl,
    headers: {
      Authorization: authorization,
    },
    debug: options.debug,
  });
};
