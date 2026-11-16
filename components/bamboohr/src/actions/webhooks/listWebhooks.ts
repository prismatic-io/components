import { action, outputSchema } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listWebhooksExamplePayload } from "../../examplePayloads";
import { listWebhooksInputs } from "../../inputs";
import { listWebhooksOutputSchema } from "../../outputSchemas";

export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "List all existing webhooks.",
  },
  inputs: listWebhooksInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listWebhooksOutputSchema,
  }),
  examplePayload: listWebhooksExamplePayload,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const {
      data: { webhooks },
    } = await client.get(ENDPOINTS.WEBHOOKS);
    if (params.showOnlyInstanceWebhooks) {
      const instanceWebhookUrls = Object.values(context.webhookUrls);
      return {
        data: (webhooks || []).filter((webhook: { url: string }) =>
          instanceWebhookUrls.includes(webhook.url),
        ),
      };
    }
    return { data: webhooks || [] };
  },
  examplePerform: async () => listWebhooksExamplePayload,
});
