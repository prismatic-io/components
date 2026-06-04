import type { Connection } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { generateBasicAuth } from "./util";

export const greenhouseUrl = "https://harvest.greenhouse.io";
export const createClient = (
  connection: Connection,
  version: string,
  debug = false,
): HttpClient => {
  const authorization = generateBasicAuth(connection);
  const baseUrl = `${greenhouseUrl}/${version}`;

  return createHttpClient({
    baseUrl,
    debug,
    headers: {
      Authorization: authorization,
    },
  });
};
