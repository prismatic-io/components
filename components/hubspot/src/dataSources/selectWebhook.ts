import { dataSource, type Element } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { selectWebhookInputs } from "../inputs";
import type { Webhook } from "../types/Webhook";
import { checkDeveloperApiKeyAndAppId } from "../util";

export const selectWebhook = dataSource({
  display: {
    label: "Select Webhook",
    description: "Select a webhook from the list of webhooks.",
  },
  inputs: selectWebhookInputs,
  perform: async (_context, { connection }) => {
    const client = getHubspotClient(
      {
        hubspotConnection: connection,
        debugRequest: false,
      },
      false,
    );
    const { developerApiKey, appId } = checkDeveloperApiKeyAndAppId(connection);
    
    const { data } = await client.get<{ results: Webhook[] }>(
      `/webhooks/v3/${appId}/subscriptions`,
      {
        params: { hapikey: developerApiKey },
      },
    );

    const result = data.results.map<Element>((webhook) => ({
      label: `${webhook.eventType} ${webhook.propertyName ? `(${webhook.propertyName})` : ""}`,
      key: webhook.id,
    }));
    return { result };
  },
  dataSourceType: "picklist",
});
