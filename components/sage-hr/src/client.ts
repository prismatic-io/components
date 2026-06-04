import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { apiKey } from "./connections";

const validateConnection = (connection: Connection) => {
  if (connection.key !== apiKey.key) {
    throw new ConnectionError(connection, "Unknown Connection type provided.");
  }

  if (!connection.fields.apiKey || !connection.fields.subdomain) {
    throw new ConnectionError(
      connection,
      "Received valid Connection type but did not find valid api key or account name.",
    );
  }
};

export const createClient = (connection: Connection, debug: boolean) => {
  validateConnection(connection);
  const { subdomain, apiKey } = connection.fields;
  const baseUrl = `https://${subdomain}.sage.hr/api`;

  const client = createHttpClient({
    baseUrl,
    headers: {
      "X-Auth-Token": util.types.toString(apiKey),
    },
    debug,
  });
  return client;
};
