import type { Connection } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { API_VERSION } from "./constants";
import { fetchToken } from "./util";

export const getBaseUrl = (connection: Connection) => {
  return connection.fields.authorizeUrl ===
    "https://api.gusto.com/oauth/authorize"
    ? "https://api.gusto.com/v1"
    : "https://api.gusto-demo.com/v1";
};

export const createClient = (
  connection: Connection,
  debug: boolean = false,
) => {
  return createHttpClient({
    baseUrl: getBaseUrl(connection),
    headers: {
      Authorization: `Bearer ${connection.token?.access_token}`,
      "X-Gusto-API-Version": API_VERSION,
    },
    debug,
  });
};

export const createWebhookClient = async (
  connection: Connection,
  debug: boolean,
) => {
  const token = await fetchToken(connection, debug);

  return createHttpClient({
    baseUrl: getBaseUrl(connection),
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Gusto-API-Version": API_VERSION,
    },
    debug,
  });
};
