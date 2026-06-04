import { dataSource, util } from "@prismatic-io/spectral";
import { createAirtableClient } from "../client";
import { selectWebhookInputs } from "../inputs";

export const selectWebhook = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Webhook",
    description: "Select a webhook subscription from an Airtable base.",
  },
  inputs: selectWebhookInputs,
  perform: async (context, { airtableConnection, baseId, includeId }) => {
    const client = createAirtableClient(airtableConnection);

    const { data } = await client.get(`/v0/bases/${baseId}/webhooks`);

    return {
      result: data.webhooks.map((webhook) => {
        const label = includeId
          ? `${webhook.notificationUrl} (id: ${webhook.id})`
          : webhook.notificationUrl;
        return {
          key: webhook.id,
          label: util.types.toString(label),
        };
      }),
    };
  },
});
