import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { updateWebhookSubscriptionInputs } from "../../inputs";
import { createWebhookClient } from "../../client";
import { updateWebhookSubscriptionExamplePayload } from "../../examplePayloads";
import { updateWebhookSubscriptionOutputSchema } from "../../outputSchemas";

export const updateWebhookSubscription = action({
  display: {
    label: "Update Webhook Subscription",
    description:
      "Updates the Webhook Subscription associated with the provided UUID for Gusto.",
  },
  inputs: updateWebhookSubscriptionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateWebhookSubscriptionOutputSchema,
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
      subscription_types: cleanedSubscriptionTypes,
    };

    const { data, headers } = await client.put(
      `/webhook_subscriptions/${params.webhookSubscriptionUuid}`,
      body,
    );
    return { data: { data, headers } };
  },
  performSafety: PerformSafety.NOT_ALLOWED,
  examplePayload: updateWebhookSubscriptionExamplePayload,
});
