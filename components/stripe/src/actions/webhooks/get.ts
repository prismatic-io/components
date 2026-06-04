import { action } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { timeout, connectionInput, webhookId } from "../../inputs";
import { getWebhookExamplePayload } from "../../examplePayloads/webhooks";

export const getWebhook = action({
  display: {
    label: "Get Webhook",
    description: "Retrieve a webhook endpoint by ID.",
  },
  perform: async (context, { stripeConnection, timeout, webhookId }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    const data = await client.webhookEndpoints.retrieve(webhookId);
    return {
      data,
    };
  },
  inputs: {
    webhookId,
    timeout,
    stripeConnection: connectionInput,
  },
  examplePayload: getWebhookExamplePayload,
});
