import { action } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { webhookEvents, webhookUrl, timeout, connectionInput } from "../../inputs";
import { getWebhookExamplePayload as createWebhookExamplePayload } from "../../examplePayloads/webhooks";
import { createWebhookFn } from "../../util";

export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Create a new webhook endpoint.",
  },
  perform: async (context, { stripeConnection, timeout, webhookEvents, webhookUrl }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    const data = await createWebhookFn(client, webhookUrl, webhookEvents as string[]);
    return {
      data,
    };
  },
  inputs: {
    webhookUrl,
    webhookEvents,
    timeout,
    stripeConnection: connectionInput,
  },
  examplePayload: createWebhookExamplePayload,
});
