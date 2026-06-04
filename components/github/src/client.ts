import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { oauth2 } from "./connections";

export const baseUrl = "https://api.github.com";

const toAuthorizationHeaders = (
  connection: Connection,
): { Authorization: string } => {
  const accessToken = util.types.toString(connection.token?.access_token);
  if (accessToken) {
    return { Authorization: `Bearer ${accessToken}` };
  }

  const apiKey = util.types.toString(connection.fields?.apiKey);
  if (apiKey) {
    return { Authorization: `Bearer ${apiKey}` };
  }

  const username = util.types.toString(connection.fields?.username);
  const password = util.types.toString(connection.fields?.password);
  if (username && password) {
    const encoded = Buffer.from(`${username}:${password}`).toString("base64");
    return { Authorization: `Basic ${encoded}` };
  }

  throw new Error(
    `Failed to guess at authorization parameters for Connection: ${connection.key}`,
  );
};

export const createClient = (connection: Connection, debug: boolean): HttpClient => {
  if (![oauth2.key].includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Received unexpected connection type: ${connection.key}`,
    );
  }

  const client = createHttpClient({
    baseUrl,
    headers: {
      ...toAuthorizationHeaders(connection),
      Accept: "application/json",
    },
    responseType: "json",
    debug,
  });
  return client;
};
