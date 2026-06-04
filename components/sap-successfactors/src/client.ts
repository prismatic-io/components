import type { Connection } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { getBaseURL, getProtocol, getToken } from "./util";

export const createClient = async (
  connection: Connection,
  debugRequest = false,
): Promise<HttpClient> => {
  const protocol = getProtocol(connection);
  const baseUrl = getBaseURL(connection);
  const token = await getToken(connection, baseUrl);
  const client = createHttpClient({
    baseUrl: `${baseUrl}${protocol}`,
    debug: debugRequest,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return client;
};
