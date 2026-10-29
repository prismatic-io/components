import type { Connection } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { HARVEST_BASE_URL, V3_BASE_URL } from "./constants";
import { generateBasicAuth, getV3Token } from "./util";

export const createClient = (
  connection: Connection,
  version: string,
  debug = false,
): HttpClient => {
  const authorization = generateBasicAuth(connection);
  const baseUrl = `${HARVEST_BASE_URL}/${version}`;

  return createHttpClient({
    baseUrl,
    debug,
    headers: {
      Authorization: authorization,
    },
  });
};

export const createV3Client = (
  connection: Connection,
  debug = false,
): HttpClient => {
  const token = getV3Token(connection);

  return createHttpClient({
    baseUrl: V3_BASE_URL,
    debug,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};
