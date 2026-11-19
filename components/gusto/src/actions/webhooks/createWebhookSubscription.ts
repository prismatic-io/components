import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createWebhookSubscriptionInputs } from "../../inputs";
import { createWebhookClient } from "../../client";
import { createWebhookSubscriptionExamplePayload } from "../../examplePayloads";
import { createWebhookSubscriptionOutputSchema } from "../../outputSchemas";

export const createWebhookSubscription = action({
  display: {
    label: "Create Webhook Subscription",
    description:
      "Creates a Webhook Subscription to receive notifications when entities change for Gusto.",
  },
  inputs: createWebhookSubscriptionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createWebhookSubscriptionOutputSchema,
  }),
  perform: async (context, params) => {
    const client = await createWebhookClient(
      params.connection,
      context.debug.enabled,
    );

    const cleanedSubscriptionTypes = params.subscriptionTypes
      .split(",")
      .map((str) => str.trim());

    const body = {
      url: params.webhookUrl,
      subscription_types: cleanedSubscriptionTypes,
    };

    const { data, headers } = await client.post(`/webhook_subscriptions`, body);
    return { data: { data, headers } };
  },
  performSafety: PerformSafety.NOT_ALLOWED,
  examplePayload: createWebhookSubscriptionExamplePayload,
});
