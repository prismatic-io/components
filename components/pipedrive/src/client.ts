import { type Connection, util } from "@prismatic-io/spectral";
import {
  type HttpClient,
  createClient as createHttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { getBaseUrl, validateConnection } from "./util";
import { WebhookVersion } from "./constants";

export const toAuthorizationHeaders = (connection: Connection): { Authorization: string } => {
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
    `Authorization parameters for the connection could not be determined: ${connection.key}`,
  );
};

export const createClient = (
  connection: Connection,
  debug = false,
  version = WebhookVersion.V1,
): HttpClient => {
  validateConnection(connection);

  const baseUrl = getBaseUrl(version);

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
