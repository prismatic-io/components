import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { refreshWebhookExamplePayload } from "../../examplePayloads";
import { connectionInput, webhookIdInput } from "../../inputs";

export const refreshWebhook = action({
  display: {
    label: "Refresh Webhook",
    description: "Refresh a webhook expiration by ID.",
  },
  inputs: {
    jiraConnection: connectionInput,
    webhookId: { ...webhookIdInput, comments: "ID of the webhook to refresh" },
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const { data } = await client.put("/webhook/refresh", {
      webhookIds: [params.webhookId],
    });
    return { data };
  },
  examplePayload: refreshWebhookExamplePayload,
});
