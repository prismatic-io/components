import { type Connection, util } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { apiKeyConnection } from "./connections/";
import { validateConnection } from "./utils";





export const getBaseUrl = (connection: Connection): string => {
  return util.types.toString(connection.fields.datadogSite);
};







export const getAuthHeaders = (
  connection: Connection,
): Record<string, string> => {
  if (connection.key === apiKeyConnection.key) {
    const apiKey = util.types.toString(connection.fields.apiKey);
    const applicationKey = util.types.toString(
      connection.fields.applicationKey,
    );
    return {
      "DD-API-KEY": apiKey,
      "DD-APPLICATION-KEY": applicationKey,
    };
  }

  
  const token = util.types.toString(connection.token?.access_token);
  return {
    Authorization: `Bearer ${token}`,
  };
};







export const createClient = (
  connection: Connection,
  debug = false,
): HttpClient => {
  validateConnection(connection);

  const baseUrl = getBaseUrl(connection);
  return createHttpClient({
    baseUrl,
    headers: {
      ...getAuthHeaders(connection),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    debug,
  });
};
