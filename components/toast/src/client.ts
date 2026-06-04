import { type Connection, util } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { getToastToken, validateConnection } from "./utils";

export const createToastClient = async (
  connection: Connection,
  debug: boolean,
  restaurantExternalId?: string | undefined,
) => {
  validateConnection(connection);
  const baseUrl = util.types.toString(connection.fields.apiUrl);
  const token = await getToastToken(connection, debug);
  return createHttpClient({
    baseUrl,
    headers: {
      Authorization: token,
      ...(restaurantExternalId && {
        "Toast-Restaurant-External-ID": restaurantExternalId,
        "Content-Type": "application/json",
      }),
    },
    debug,
  });
};
