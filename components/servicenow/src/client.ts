import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { createClient as createAxiosClient } from "@prismatic-io/spectral/dist/clients/http";
import { authorizationCode, basic } from "./connections";

export const getAuthHeaders = (
  connection: Connection,
): { Authorization: string } | Record<string, never> => {
  if (!connection) return {};

  if (connection.key === basic.key) {
    const username = util.types.toString(connection.fields.username);
    const password = util.types.toString(connection.fields.password);
    const hash = Buffer.from(`${username}:${password}`).toString("base64");
    return { Authorization: `Basic ${hash}` };
  }

  if (connection.key === authorizationCode.key) {
    const token = util.types.toString(connection.token.access_token);
    return { Authorization: `Bearer ${token}` };
  }

  throw new ConnectionError(connection, "Unknown Connection type provided.");
};

export const createClient = (
  connection: Connection,
  url: string,
  debug: boolean,
) => {
  const authHeaders = getAuthHeaders(connection);
  return createAxiosClient({ baseUrl: url, headers: authHeaders, debug });
};
