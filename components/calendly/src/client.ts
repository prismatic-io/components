import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { LIVE_API_URL, MOCK_API_URL } from "./constants";
import { calendlyOauth2Connection } from "./connections";

export const validateConnection = (connection: Connection) => {
  if (connection.key !== calendlyOauth2Connection.key) {
    throw new ConnectionError(connection, "Calendly connection not found");
  }
};

export const getCalendlyClient = (connection: Connection, debug: boolean) => {
  validateConnection(connection);
  const baseUrl = util.types.toBool(connection.fields.useLiveServer)
    ? LIVE_API_URL
    : MOCK_API_URL;
  return createClient({
    baseUrl,
    headers: {
      authorization: `Bearer ${connection.token?.access_token}`,
      "Content-Type": "application/json",
    },
    debug,
  });
};
