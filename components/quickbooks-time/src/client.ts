import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { oauth } from "./connections";

export const createClient = (connection: Connection, debug: boolean, baseUrl?: unknown) => {
  if (connection.key !== oauth.key) {
    throw new ConnectionError(connection, "Unknown Connection type provided.");
  }

  if (!connection.token?.access_token) {
    throw new ConnectionError(
      connection,
      "Received valid Connection type but did not receive access token.",
    );
  }

  const token = util.types.toString(connection.token.access_token);
  return createHttpClient({
    baseUrl: !util.types.toString(baseUrl)
      ? "https://rest.tsheets.com/api/v1"
      : util.types.toString(baseUrl),
    headers: {
      Authorization: `Bearer ${token}`,
    },
    debug,
  });
};
