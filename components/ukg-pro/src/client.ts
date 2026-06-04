import type { Connection } from "@prismatic-io/spectral";
import { util } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { ukgProBasicAuth } from "./connections";
import { getAuthHeaders, getBaseUrl, validateConnection } from "./util/connection";















export const createClient = async (connection: Connection, debug = false): Promise<HttpClient> => {
  validateConnection(connection);
  const baseUrl = getBaseUrl(connection);
  const headers = await getAuthHeaders(connection);

  return createHttpClient({
    baseUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    debug,
  });
};





export const createBasicAuthClient = (connection: Connection, debug = false): HttpClient => {
  if (connection.key !== ukgProBasicAuth.key) {
    throw new Error(
      `Expected ${ukgProBasicAuth.key} connection, got ${connection.key}. Use Basic Auth connection for Personnel and Configuration APIs.`,
    );
  }

  const { baseUrl, username, password, customerApiKey } = connection.fields;
  const credentials = Buffer.from(`${username}:${password}`).toString("base64");

  return createHttpClient({
    baseUrl: util.types.toString(baseUrl),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
      "US-Customer-Api-Key": util.types.toString(customerApiKey),
    },
    debug,
  });
};




























