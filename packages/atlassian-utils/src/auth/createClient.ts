import type { Connection } from "@prismatic-io/spectral";
import {
  createClient as createHttpClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import type { AtlassianConnectionKeys } from "../interfaces/AtlassianConnectionKeys";
import { buildAuthHeaders } from "./buildAuthHeaders";
import { resolveAtlassianHost } from "./resolveHost";
import { validateAtlassianConnection } from "./validateConnection";

export interface CreateAtlassianClientOptions {
  keys: AtlassianConnectionKeys;

  apiPath: string;
  debug?: boolean;
}

export const createAtlassianClient = async (
  connection: Connection,
  options: CreateAtlassianClientOptions,
): Promise<HttpClient> => {
  validateAtlassianConnection(connection, options.keys);
  const host = await resolveAtlassianHost(connection, options.keys);
  return createHttpClient({
    debug: options.debug ?? false,
    baseUrl: `https://${host}${options.apiPath}`,
    headers: {
      ...buildAuthHeaders(connection, options.keys),
      Accept: "application/json",
    },
    responseType: "json",
  });
};
