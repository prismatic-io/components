import type { Connection } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { validateConnection } from "./util";

export const shipbobURL = "https://api.shipbob.com";
export const createClient = (
  connection: Connection,
  version: string,
  debug: boolean,
): HttpClient => {
  validateConnection(connection);
  const baseUrl = `${shipbobURL}/${version}`;

  const client = createHttpClient({
    baseUrl,
    headers: {
      Authorization: `Bearer ${
        connection?.token?.access_token || connection?.fields?.apiToken
      }`,
    },
    debug,
  });
  return client;
};
