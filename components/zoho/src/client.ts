import { type Connection, util } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { validateConnection } from "./util/general";

export enum ClientType {
  CRM = "CRM",
  BOOKS = "BOOKS",
}

export const getBaseUrl = (connection: Connection, clientType: ClientType): string => {
  
  
  
  const tld = util.types
    .toString(connection.context?.["accounts-server"])
    .replace("https://accounts.zoho.", "");
  return clientType === ClientType.CRM
    ? `https://www.zohoapis.${tld}/crm/v8/`
    : `https://www.zohoapis.${tld}/books/v3/`;
};

export const requestHeaders = (connection: Connection): Record<string, string> => {
  const authToken = util.types.toString(connection.token?.access_token);
  return {
    Authorization: `Zoho-oauthtoken ${authToken}`,
    Accept: "application/json",
  };
};

export const createClient = (
  connection: Connection,
  clientType: ClientType,
  debugRequest: boolean,
): HttpClient => {
  validateConnection(connection);

  const client = createHttpClient({
    baseUrl: getBaseUrl(connection, clientType),
    headers: requestHeaders(connection),
    responseType: "json",
    debug: debugRequest,
  });

  return client;
};
