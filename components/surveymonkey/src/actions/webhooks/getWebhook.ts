import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getWebhookInputs } from "../../inputs";
import { getWebhookExamplePayload } from "../../examplePayloads";
import type { Webhook } from "../../types";






export const getWebhook = action({
  display: {
    label: "Get Webhook",
    description: "Retrieve details about a specific webhook.",
  },
  inputs: getWebhookInputs,
  perform: async (context, { connection, webhookId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get<Webhook>(`/webhooks/${webhookId}`);

    return { data };
  },
  examplePayload: getWebhookExamplePayload,
});
