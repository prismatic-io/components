import { action } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { listWebhooksExamplePayload } from "../../examplePayloads";
import { listWebhooksInputs } from "../../inputs";


export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "List all existing webhooks.",
  },
  inputs: listWebhooksInputs,
  examplePayload: listWebhooksExamplePayload,
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const {
      data: { webhooks },
    } = await client.get("/v1/webhooks");
    if (params.showOnlyInstanceWebhooks) {
      const instanceWebhookUrls = Object.values(context.webhookUrls);
      return {
        data: (webhooks || []).filter((webhook) =>
          instanceWebhookUrls.includes(webhook.url),
        ),
      };
    }
    return { data: webhooks || [] };
  },
});
