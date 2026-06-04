import type { Connection } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { validateConnection } from "./util";

export const createClient = (connection: Connection, debug = false) => {
  validateConnection(connection);
  const { dataCenter } = connection.fields;
  return createHttpClient({
    baseUrl: `${dataCenter}/api/v3`,
    debug,
    headers: {
      Authorization: `Zoho-oauthtoken ${connection.token?.access_token}`,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/vnd.manageengine.sdp.v3+json",
    },
  });
};
