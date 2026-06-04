import { type Connection, util } from "@prismatic-io/spectral";
import { createClient, type HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { API_URLS } from "./constants";
import { validateConnection } from "./util";

export const getClient = (
  connection: Connection,
  debug: boolean,
  site?: string,
  company?: string,
): HttpClient => {
  validateConnection(connection);
  const ocpApimSubscriptionKey = util.types.toString(
    connection.fields["ocp-apim-subscription-key"],
  );
  const sage200edition = util.types.toString(connection.fields.sage200edition);
  const baseUrl = API_URLS[sage200edition];
  return createClient({
    baseUrl,
    debug,
    headers: {
      Authorization: `Bearer ${connection.token?.access_token}`,
      "Content-Type": "application/json",
      "ocp-apim-subscription-key": ocpApimSubscriptionKey,
      "X-Company": company,
      "X-Site": site,
    },
  });
};
