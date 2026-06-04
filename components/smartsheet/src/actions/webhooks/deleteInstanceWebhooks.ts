import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteInstanceWebhooksExamplePayload } from "../../examplePayloads";
import { deleteInstanceWebhooksInputs } from "../../inputs";
import type { SmartsheetWebhook } from "../../types";
import { paginateByPage } from "../../util/pagination";

export const deleteInstanceWebhooks = action({
  display: {
    label: "Delete Instance Webhooks",
    description:
      "Deletes all Smartsheet webhooks that point to a flow in this instance.",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const allWebhooks = await paginateByPage<SmartsheetWebhook>(
      client,
      "/webhooks",
    );

    
    const instanceWebhookUrls = Object.values(context.webhookUrls);
    const smartsheetWebhooks = allWebhooks.filter((webhook) =>
      instanceWebhookUrls.includes(webhook.callbackUrl),
    );

    
    for (const webhook of smartsheetWebhooks) {
      context.logger.info(`Deleting webhook ${webhook.id}...`);
      await client.delete(`/webhooks/${webhook.id}`);
    }
    return Promise.resolve({ data: null });
  },
  inputs: deleteInstanceWebhooksInputs,
  examplePayload: deleteInstanceWebhooksExamplePayload,
});
