import { action } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { deleteWebhookPayload } from "../../examplePayloads";
import { connectionInput } from "../../inputs";
import { fetchWebhooks } from "./utils";

export const deleteInstanceWebhooks = action({
  display: {
    label: "Delete Instance Webhooks",
    description: "Delete all webhooks pointing to this instance.",
  },
  inputs: { zendeskConnection: connectionInput },
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
  examplePayload: {
    data: deleteWebhookPayload,
  },
});
