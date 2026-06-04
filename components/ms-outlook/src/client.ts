import { type Connection, util } from "@prismatic-io/spectral/dist/";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { validateConnection } from "./util";

export const BASE_URL = "https://graph.microsoft.com";

export const createClient = (connection: Connection, debug: boolean): HttpClient => {
  validateConnection(connection);

  const baseUrl = `${util.types.toString(connection.fields.baseUrl) || BASE_URL}/v1.0`;

  const token = util.types.toString(connection.token?.access_token);
  const client = createHttpClient({
    baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
      Accepts: "application/json",
      "Content-type": "application/json",
    },
    debug,
  });

  return client;
};
