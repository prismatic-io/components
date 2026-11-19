import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { getWebhookSubscriptionInputs } from "../../inputs";
import { createWebhookClient } from "../../client";
import { getWebhookSubscriptionExamplePayload } from "../../examplePayloads";
import { getWebhookSubscriptionOutputSchema } from "../../outputSchemas";

export const getWebhookSubscription = action({
  display: {
    label: "Get Webhook Subscription",
    description:
      "Returns the Webhook Subscription associated with the provided UUID for Gusto.",
  },
  inputs: getWebhookSubscriptionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getWebhookSubscriptionOutputSchema,
  }),
  perform: async (context, params) => {
    const client = await createWebhookClient(
      params.connection,
      context.debug.enabled,
    );
    const endpoint = `/webhook_subscriptions/${params.webhookSubscriptionUuid}`;

    const { data, headers } = await client.get(endpoint);
    return { data: { data, headers } };
  },
  performSafety: PerformSafety.SAFE,
  examplePayload: getWebhookSubscriptionExamplePayload,
});
