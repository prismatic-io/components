import { type Connection, util } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";

export const createClient = (connection: Connection, debug: boolean) => {
  return createHttpClient({
    baseUrl: "https://analytics.adobe.io",
    headers: {
      Authorization: `Bearer ${connection.token?.access_token}`,
      "x-api-key": util.types.toString(connection.fields.clientId),
    },
    debug,
  });
};
