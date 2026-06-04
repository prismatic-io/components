import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { createWebhookSubscriptionExamplePayload } from "../../examplePayloads";
import { createWebhookSubscriptionInputs } from "../../inputs";

export const createWebhookSubscription = action({
  display: {
    label: "Create Webhook Subscription",
    description: "Creates a webhook subscription.",
  },
  perform: async (context, { squareConnection, idempotencyKey, webhookSubscription }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const response = await client.post("/v2/webhooks/subscriptions", {
      idempotency_key: idempotencyKey,
      subscription: webhookSubscription,
    });

    return {
      data: response.data,
    };
  },
  inputs: createWebhookSubscriptionInputs,
  examplePayload: createWebhookSubscriptionExamplePayload,
});
