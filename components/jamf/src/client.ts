import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { jamfBearerToken, jamfClientCredentials } from "./connections";

const fetchAccessToken = async (
  connection: Connection,
  baseUrl: string,
): Promise<string> => {
  if (connection.key === jamfClientCredentials.key) {
    const clientId = util.types.toString(connection.fields.clientId);
    const clientSecret = util.types.toString(connection.fields.clientSecret);
    const authClient = createHttpClient({ baseUrl });
    const response = await authClient.post<{ access_token: string }>(
      "/api/v1/oauth/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }).toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );
    return response.data.access_token;
  }

  if (connection.key === jamfBearerToken.key) {
    const username = util.types.toString(connection.fields.username);
    const password = util.types.toString(connection.fields.password);
    const credentials = Buffer.from(`${username}:${password}`).toString(
      "base64",
    );
    const authClient = createHttpClient({
      baseUrl,
      headers: { Authorization: `Basic ${credentials}` },
    });
    const response = await authClient.post<{ token: string }>(
      "/api/v1/auth/token",
    );
    return response.data.token;
  }

  throw new ConnectionError(
    connection,
    `Unsupported connection type: ${connection.key}`,
  );
};

export const getBaseUrl = (connection: Connection): string =>
  util.types.toString(connection.fields.baseUrl).replace(/\/$/, "");

export const createClient = async (
  connection: Connection,
  debug = false,
): Promise<HttpClient> => {
  const baseUrl = getBaseUrl(connection);
  const token = await fetchAccessToken(connection, baseUrl);
  return createHttpClient({
    baseUrl: `${baseUrl}/api`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    debug,
  });
};

export const createClassicClient = async (
  connection: Connection,
  debug = false,
): Promise<HttpClient> => {
  const baseUrl = getBaseUrl(connection);
  const token = await fetchAccessToken(connection, baseUrl);
  return createHttpClient({
    baseUrl: `${baseUrl}/JSSResource`,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    debug,
  });
};
