import { action } from "@prismatic-io/spectral";
import { createWebhookInputs } from "../../inputs";
import { createClient } from "../../client";
export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description:
      "Create a webhook to send data from Confluence to an instance URL.",
  },
  inputs: createWebhookInputs,
  performSafety: "notAllowed",
  perform: async (context, { connectionInput, webhookDetails, webhookUrl }) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.post("/webhook", {
      url: webhookUrl,
      webhooks: webhookDetails,
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: {
      webhookRegistrationResult: [
        {
          createdWebhookId: 7,
        },
      ],
    },
  }),
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
