import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { MarketoConnection } from "./connections";
import { URL } from "node:url";

export const baseUrl = (connection: Connection): string => {
  const tokenUrl = new URL(util.types.toString(connection.fields?.tokenUrl));
  return `${tokenUrl.origin}/rest/`;
};

export const authorizationHeaders = async (
  connection: Connection,
  debugRequest: boolean,
): Promise<{ Authorization: string }> => {
  const expiresDate = new Date(
    util.types.toString(connection.token?.expires_at),
  );
  const now = new Date();

  





  if (now < expiresDate) {
    return {
      Authorization: `Bearer ${util.types.toString(
        connection.token?.access_token,
      )}`,
    };
  } else {
    if (debugRequest) {
      console.log("Token expired, fetching new token");
    }
    const client = createHttpClient({
      baseUrl: util.types.toString(connection.fields?.tokenUrl),
      debug: debugRequest,
    });
    const { data } = await client.post("", null, {
      params: {
        grant_type: "client_credentials",
        client_id: util.types.toString(connection.fields?.clientId),
        client_secret: util.types.toString(connection.fields?.clientSecret),
      },
    });
    return {
      Authorization: `Bearer ${data?.access_token}`,
    };
  }
};

export const createClient = async (
  connection: Connection,
  debugRequest: boolean,
): Promise<HttpClient> => {
  if (connection.key !== MarketoConnection.key) {
    throw new ConnectionError(
      connection,
      `Unsupported Connection specified. Please specify a supported connection type for Marketo. Received ${connection.key}`,
    );
  }

  const client = createHttpClient({
    baseUrl: baseUrl(connection),
    headers: {
      ...(await authorizationHeaders(connection, debugRequest)),
      Accept: "application/json",
    },
    responseType: "json",
    debug: debugRequest,
  });

  return client;
};
