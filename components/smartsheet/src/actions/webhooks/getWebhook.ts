import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getWebhookExamplePayload } from "../../examplePayloads";
import { getWebhookInputs } from "../../inputs";

export const getWebhook = action({
  display: {
    label: "Get Webhook",
    description: "Retrieves a webhook by its ID.",
  },
  perform: async (context, { connection, webhookId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/webhooks/${webhookId}`);
    return { data };
  },
  inputs: getWebhookInputs,
  examplePayload: getWebhookExamplePayload,
});
