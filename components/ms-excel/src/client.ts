import type { Connection } from "@prismatic-io/spectral";
import { createClient as createAxiosClient } from "@prismatic-io/spectral/dist/clients/http";
import { getBaseUrl, getSource, validateConnection } from "./helpers";
import type { CreateClientData } from "./interfaces";

export const createClient = (
  connection: Connection,
  debug: boolean,
  useBeta = false,
): CreateClientData => {
  validateConnection(connection);
  const source = getSource(connection);

  const client = createAxiosClient({
    baseUrl: getBaseUrl(useBeta),
    headers: {
      Authorization: `Bearer ${connection.token?.access_token}`,
    },
    debug,
  });

  return {
    client,
    source,
  };
};
