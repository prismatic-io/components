import {
  type ActionContext,
  type Connection,
  type DataSourceContext,
  util,
} from "@prismatic-io/spectral";
import { createClient, type HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { validateConnection } from "./utils";

export const getMsBusinessCentralClient = (
  receivedConnection: Connection,
  _context: ActionContext | DataSourceContext,
  debug = false,
  version = "v2.0",
): HttpClient => {
  validateConnection(receivedConnection);

  const baseUrl = util.types.toString(receivedConnection.fields.webApiUrl);
  const accessToken = util.types.toString(receivedConnection.token?.access_token);

  const client = createClient({
    baseUrl: `${baseUrl}/api/${version}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    debug,
  });

  return client;
};
