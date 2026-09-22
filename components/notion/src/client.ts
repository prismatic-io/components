import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import {
  type HttpClient,
  createClient as createHttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { notionInternalIntegration } from "./connections/notionInternalIntegration";
import { notionOauth } from "./connections/notionOauth";
import { BASE_URL, NOTION_VERSION, OLD_NOTION_VERSION } from "./constants";
export const getAuthorizationHeader = (connection: Connection): string => {
  if (connection.key === notionOauth.key) {
    return `Bearer ${util.types.toString(connection.token?.access_token)}`;
  }
  if (connection.key === notionInternalIntegration.key) {
    return `Bearer ${util.types.toString(connection.fields?.apiKey)}`;
  }
  throw new ConnectionError(connection, "Unsupported Notion connection type");
};
export const createClient = (
  connection: Connection,
  debug = false,
): HttpClient => {
  const headers: Record<string, string> = {
    "Notion-Version": NOTION_VERSION,
    Authorization: getAuthorizationHeader(connection),
  };
  return createHttpClient({
    baseUrl: BASE_URL,
    headers,
    responseType: "json",
    debug,
  });
};
export const createOldClient = (
  connection: Connection,
  debug = false,
): HttpClient => {
  const headers: Record<string, string> = {
    "Notion-Version": OLD_NOTION_VERSION,
    Authorization: getAuthorizationHeader(connection),
  };
  return createHttpClient({
    baseUrl: BASE_URL,
    headers,
    responseType: "json",
    debug,
  });
};
