import { type Connection, util } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";

export const createClient = (
  connection: Connection,
  debugRequest: boolean,
  version = "v2",
) => {
  return createHttpClient({
    debug: debugRequest,
    baseUrl: `${connection.fields.baseUrl}/${version}`,
    headers: {
      Authorization: `Bearer ${util.types.toString(connection.fields.apiKey)}`,
    },
  });
};
