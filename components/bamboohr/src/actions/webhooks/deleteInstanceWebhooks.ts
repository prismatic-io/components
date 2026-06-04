import { action } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
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
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const {
      data: { webhooks },
    } = await client.get("/v1/webhooks");

    
    const instanceWebhookUrls = Object.values(context.webhookUrls);
    const instanceBambooWebhooks = webhooks.filter((webhook) =>
      instanceWebhookUrls.includes(webhook.url),
    );

    
    for (const webhook of instanceBambooWebhooks) {
      context.logger.info(`Deleting webhook ${webhook.id}...`);
      await client.delete(`/v1/webhooks/${webhook.id}/`);
    }
    return { data: null };
  },
});
