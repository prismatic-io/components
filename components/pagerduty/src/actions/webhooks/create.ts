import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { createWebhookExamplePayload } from "../../examplePayloads";
import { connectionInput, createWebhookObject } from "../../inputs";

export const createWebhookSubscription = action({
  display: {
    label: "Create Webhook Subscription",
    description: "Create a new webhook subscription.",
  },
  perform: async (context, { connection, webhookSubscription }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(ENDPOINTS.WEBHOOK_SUBSCRIPTIONS, {
      webhook_subscription: webhookSubscription,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    webhookSubscription: createWebhookObject,
  },
  examplePayload: createWebhookExamplePayload,
});
