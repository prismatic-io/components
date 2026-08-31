import { dataSource, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { selectWebhookExamplePayload } from "../examplePayloads";
import { selectWebhookInputs } from "../inputs";
import { getAllWebhookEntries } from "../util";
export const selectWebhook = dataSource({
  display: {
    label: "Select Webhook",
    description: "Select webhook from Box account.",
  },
  dataSourceType: "picklist",
  perform: async (context, { boxConnection }) => {
    const client = createAuthorizedClient({ boxConnection });
    const { entries } = await getAllWebhookEntries(client);
    const webhooks = await Promise.all(
      (entries || []).map((entry) =>
        client.webhooks.getWebhookById(util.types.toString(entry.id)),
      ),
    );
    return {
      result: (webhooks || []).map((webhook) => ({
        label: util.types.toString(webhook.address),
        key: util.types.toString(webhook.id),
      })),
    };
  },
  inputs: selectWebhookInputs,
  examplePayload: selectWebhookExamplePayload,
});
