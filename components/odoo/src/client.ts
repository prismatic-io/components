import { type Connection, util } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { validateConnection } from "./util";

const buildBaseUrl = (baseUrlInput: string, portInput?: string): string => {
  const baseUrl = baseUrlInput.replace(/\/+$/, "");
  if (!portInput) {
    return baseUrl;
  }
  const port = portInput.trim();
  if (!port || port === "80" || port === "443") {
    return baseUrl;
  }
  return `${baseUrl}:${port}`;
};

export const getClientConfig = (connection: Connection) => {
  const { baseUrl, port, db, apiKey } = connection.fields;
  const baseUrlString = util.types.toString(baseUrl);
  const portString = port ? util.types.toString(port) : undefined;
  return {
    baseUrl: buildBaseUrl(baseUrlString, portString),
    authHeaders: {
      Authorization: `Bearer ${util.types.toString(apiKey)}`,
      "X-Odoo-Database": util.types.toString(db),
    },
  };
};

export const createOdooClient = (
  connection: Connection,
  debug = false,
): HttpClient => {
  validateConnection(connection);
  const { baseUrl, authHeaders } = getClientConfig(connection);
  return createHttpClient({
    baseUrl,
    headers: {
      ...authHeaders,
      "Content-Type": "application/json",
    },
    debug,
  });
};
