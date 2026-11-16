import { action } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { deleteInstanceWebhooksExamplePayload } from "../../examplePayloads";
import { deleteInstanceWebhooksInputs } from "../../inputs";

export const deleteInstanceWebhooks = action({
  display: {
    label: "Delete Instance Webhooks",
    description:
      "Delete all BambooHR webhooks that point to a flow in this instance.",
  },
  inputs: deleteInstanceWebhooksInputs,
  examplePayload: deleteInstanceWebhooksExamplePayload,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const {
      data: { webhooks },
    } = await client.get(ENDPOINTS.WEBHOOKS);

    const instanceWebhookUrls = Object.values(context.webhookUrls);
    const instanceBambooWebhooks = webhooks.filter(
      (webhook: { url: string; id: string }) =>
        instanceWebhookUrls.includes(webhook.url),
    );

    for (const webhook of instanceBambooWebhooks) {
      context.logger.info(`Deleting webhook ${webhook.id}...`);
      await client.delete(`${ENDPOINTS.WEBHOOKS}/${webhook.id}/`);
    }
    return { data: null };
  },
  examplePerform: async () => deleteInstanceWebhooksExamplePayload,
});
