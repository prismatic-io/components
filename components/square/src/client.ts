import type { Connection } from "@prismatic-io/spectral";
import { util } from "@prismatic-io/spectral";
import { createClient, type HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { getAuthHeaders, getBaseUrl, validateConnection } from "./util";

export const createAuthorizedClient = async (
  connection: Connection,
  debug?: boolean,
): Promise<HttpClient> => {
  validateConnection(connection);
  const baseUrl = getBaseUrl(connection);
  const apiVersion = util.types.toString(connection.fields.apiVersion);

  const client = createClient({
    baseUrl,
    headers: getAuthHeaders(connection, apiVersion),
    debug,
  });

  return Promise.resolve(client);
};

export const getVersionFromConnection = (connection: Connection): string => {
  validateConnection(connection);
  return util.types.toString(connection.fields.apiVersion);
};
