










import type { Connection } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { getAuthenticatedConnectionDetails } from "./util";








export const createClient = (
  connection: Connection,
  debug: boolean,
): HttpClient => {
  const { accessToken, baseUrl } =
    getAuthenticatedConnectionDetails(connection);

  return createHttpClient({
    baseUrl,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    responseType: "json",
    debug,
  });
};
