import { type Connection, util } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { gongApiKey, gongConnection } from "./connections";
import type { GetHeadersProps } from "./interfaces";

export const getHeaders = (connection: Connection): GetHeadersProps => {
  if (connection.key === gongConnection.key) {
    const connectionToken = connection.token;
    if (connectionToken) {
      return {
        baseUrl: util.types.toString(connectionToken.api_base_url_for_customer),
        headers: {
          Authorization: `Bearer ${util.types.toString(
            connectionToken.access_token,
          )}`,
        },
      };
    }
  }

  if (connection.key === gongApiKey.key) {
    const { baseUrl, accessKey, accessKeySecret } = connection.fields;
    const basicAuth = Buffer.from(`${accessKey}:${accessKeySecret}`).toString(
      "base64",
    );
    return {
      baseUrl: util.types.toString(baseUrl),
      headers: {
        Authorization: `Basic ${basicAuth}`,
      },
    };
  }

  throw new Error(
    `Failed to guess at authorization parameters for Connection: ${connection.key}`,
  );
};

export const createClient = (
  connection: Connection,
  debug: boolean,
): HttpClient => {
  const { baseUrl, headers } = getHeaders(connection);

  return createHttpClient({
    baseUrl,
    headers: {
      ...headers,
      Accept: "application/json",
    },
    responseType: "json",
    debug,
  });
};
