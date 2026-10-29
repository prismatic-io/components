import type { Connection } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { getBaseUrl, getToken, validateConnection } from "./util/util";

export const createClient = async (
  connection: Connection,
  debug: boolean = false,
): Promise<HttpClient> => {
  validateConnection(connection);
  const baseUrl = getBaseUrl(connection);
  const token = await getToken(connection);
  return createHttpClient({
    baseUrl: `${baseUrl}/api/v1`,
    headers: {
      Authorization: token,
      "okta-response": "omitCredentials",
    },
    debug,
  });
};
