import { util, type Connection } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/http";
import {
  API_VERSION,
  PRODUCTION_AUTHORIZE_URL,
  PRODUCTION_BASE_URL,
  SANDBOX_BASE_URL,
} from "./constants";
import { fetchToken } from "./util";

export const getBaseUrl = (connection: Connection) => {
  return util.types.toString(connection.fields.authorizeUrl) ===
    PRODUCTION_AUTHORIZE_URL
    ? PRODUCTION_BASE_URL
    : SANDBOX_BASE_URL;
};

export const createClient = (
  connection: Connection,
  debug: boolean = false,
) => {
  const accessToken = util.types.toString(connection.token?.access_token);

  return createHttpClient({
    baseUrl: getBaseUrl(connection),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Gusto-API-Version": API_VERSION,
    },
    debug,
  });
};

export const createWebhookClient = async (
  connection: Connection,
  debug: boolean = false,
) => {
  const token = await fetchToken(connection, debug);

  return createHttpClient({
    baseUrl: getBaseUrl(connection),
    headers: {
      Authorization: `Bearer ${util.types.toString(token)}`,
      "X-Gusto-API-Version": API_VERSION,
    },
    debug,
  });
};
