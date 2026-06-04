import type { Connection } from "@prismatic-io/spectral";
import {
  createClient as createAxiosClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";
import { checkConnectionKey, getBaseURL, getRealmId } from "./util";

export const createHttpClient = (
  connection: Connection,
  debug: boolean,
): HttpClient => {
  checkConnectionKey(connection);
  const realmId = getRealmId(connection);
  const rootUrl = getBaseURL(connection);

  return createAxiosClient({
    baseUrl: `${rootUrl}v3/company/${realmId}`,
    headers: {
      Authorization: `Bearer ${connection.token.access_token}`,
    },
    debug,
  });
};
