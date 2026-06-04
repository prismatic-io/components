import type { Connection } from "@prismatic-io/spectral";
import { createClient, type HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { getAuthHeaders, getBaseUrl } from "./util";












export const getSapClient = (
  sapConnection: Connection,
  headers: Record<string, string> = {},
): HttpClient => {
  const baseUrl = getBaseUrl(sapConnection);
  const authHeaders = getAuthHeaders(sapConnection);

  const sapClient = createClient({
    baseUrl,
    headers: {
      ...authHeaders,
      ...headers,
    },
  });

  return sapClient;
};
