import type { Connection } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { notionInternalIntegration, notionOauth } from "./connections";

export const baseUrl = "https://api.notion.com/v1";
export const notionVersion = "2025-09-03";
export const oldNotionVersion = "2022-06-28";

export const getAuthorizationHeader = (connection: Connection): string => {
  if (connection.key === notionOauth.key) {
    return `Bearer ${connection.token?.access_token}`;
  }

  if (connection.key === notionInternalIntegration.key) {
    return `Bearer ${connection.fields?.apiKey}`;
  }

  throw new Error("Unsupported Notion connection type");
};

export const createClient = (connection: Connection, debug: boolean) => {
  const headers: Record<string, string> = {
    "Notion-Version": notionVersion,
    Authorization: getAuthorizationHeader(connection),
  };

  return createHttpClient({
    baseUrl,
    headers,
    debug,
  });
};

export const createOldClient = (connection: Connection, debug: boolean) => {
  const headers: Record<string, string> = {
    "Notion-Version": oldNotionVersion,
    Authorization: getAuthorizationHeader(connection),
  };

  return createHttpClient({
    baseUrl,
    headers,
    debug,
  });
};
