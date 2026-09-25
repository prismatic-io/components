import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { deleteInstanceWebhooksExamplePayload } from "../../examplePayloads";
import { deleteInstanceWebhooksInputs } from "../../inputs";
import { deleteInstanceWebhooksOutputSchema } from "../../outputSchemas";
import { fetchWebhooks } from "../../util";
export const deleteInstanceWebhooks = action({
  display: {
    label: "Delete Instance Webhooks",
    description: "Delete all webhooks pointing to this instance.",
  },
  inputs: deleteInstanceWebhooksInputs,
  performSafety: "notAllowed",
  perform: async ({ logger, webhookUrls }, params) => {
    const client = rawHttpClient(params.zendeskConnection);
    const instanceWebhookUrls = Object.values(webhookUrls);
    const webhooks = await fetchWebhooks({
      client,
      showOnlyInstanceWebhooks: true,
      instanceWebhookUrls,
    });
    for (const webhook of webhooks) {
      logger.info(`Deleting webhook "${webhook.name}" (ID: ${webhook.id})`);
      await client.delete(`/webhooks/${webhook.id}`);
    }
    return { data: null };
  },
  examplePerform: async () => deleteInstanceWebhooksExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteInstanceWebhooksOutputSchema,
  }),
  examplePayload: deleteInstanceWebhooksExamplePayload,
});
