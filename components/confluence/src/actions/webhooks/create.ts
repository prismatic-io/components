import { action } from "@prismatic-io/spectral";
import { connectionInput, webhookUrl, webhookDetails } from "../../inputs";
import { createClient } from "../../client";

export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description:
      "Create a webhook to send data from Confluence to an instance URL",
  },
  inputs: {
    connectionInput,
    webhookUrl,
    webhookDetails,
  },
  perform: async (context, { connectionInput, webhookDetails, webhookUrl }) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.post("/webhook", {
      url: webhookUrl,
      webhooks: webhookDetails,
    });
    return { data };
  },
  examplePayload: {
    data: {
      webhookRegistrationResult: [
        {
          createdWebhookId: 7,
        },
      ],
    },
  },
});
