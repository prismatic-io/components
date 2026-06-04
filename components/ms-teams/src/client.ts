import { oauth, clientCredentials, webhook, adminConsent } from "./connections";
import type { Connection } from "@prismatic-io/spectral";
import { ConnectionError, util } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { getAdminConsentToken } from "./utils";

export const baseUrl = "https://graph.microsoft.com/v1.0";

export const createClient = async (
  connection: Connection,
  timeout?: number,
  debug?: boolean,
): Promise<HttpClient> => {
  if (
    ![oauth.key, clientCredentials.key, adminConsent.key].includes(
      connection.key,
    )
  ) {
    throw new ConnectionError(connection, "Unknown Connection type provided.");
  }
  if (adminConsent.key === connection.key)
    await getAdminConsentToken(connection);

  const token = util.types.toString(connection.token.access_token);
  const teamsClient = createHttpClient({
    baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
      Accepts: "application/json",
      "Content-type": "application/json",
    },
    timeout,
    debug,
  });

  return teamsClient;
};

export const createIncomingWebhookClient = (
  connection: Connection,
  debug?: boolean,
): HttpClient => {
  if (connection.key !== webhook.key) {
    throw new ConnectionError(
      connection,
      "This action requires an Incoming Webhook connection.",
    );
  }

  return createHttpClient({
    baseUrl: util.types.toString(connection.fields.webhookUrl),
    debug,
  });
};
