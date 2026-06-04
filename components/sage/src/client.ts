import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { oauth } from "./connections";

export const getToken = (connection: Connection) => {
  if (connection.key !== oauth.key) {
    throw new ConnectionError(connection, "Unknown Connection type received.");
  }

  if (!connection.token?.access_token) {
    throw new ConnectionError(
      connection,
      "Received valid Connection but it did not contain an access token.",
    );
  }

  return util.types.toString(connection.token.access_token);
};

export const baseUrl = "https://api.accounting.sage.com/v3.1";

export const getSageClient = (connection: Connection, debug: boolean, timeout?: unknown) => {
  const token = getToken(connection);
  const sageClient = createClient({
    baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
      Accepts: "application/json",
      "Content-type": "application/json",
    },
    timeout: util.types.toInt(timeout, 2000),
    debug,
  });

  return sageClient;
};
