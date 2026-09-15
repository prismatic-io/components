import { action, outputSchema } from "@prismatic-io/spectral";
import { getWebhookSubscriptionOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { getWebhookSubscriptionInputs } from "../../inputs";
import { getWebhookSubscriptionExamplePayload } from "../../examplePayloads";
export const getWebhookSubscription = action({
  display: {
    label: "Get Webhook Subscription",
    description: "Get a specified Webhook Subscription.",
  },
  performSafety: "safe",
  perform: async (context, { connection, webhookUuid }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const { data } = await client.get(`/webhook_subscriptions/${webhookUuid}`);
    return { data };
  },
  inputs: getWebhookSubscriptionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getWebhookSubscriptionOutputSchema,
  }),
  examplePayload: getWebhookSubscriptionExamplePayload,
});
