import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { updateWebhookSubscriptionExamplePayload } from "../../examplePayloads";
import { updateWebhookSubscriptionInputs } from "../../inputs";

export const updateWebhookSubscription = action({
  display: {
    label: "Update Webhook Subscription",
    description: "Updates a webhook subscription.",
  },
  perform: async (context, { squareConnection, subscriptionId, updatedWebhookSubscription }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const response = await client.put(`/v2/webhooks/subscriptions/${subscriptionId}`, {
      subscription: updatedWebhookSubscription,
    });

    return {
      data: response.data,
    };
  },
  inputs: updateWebhookSubscriptionInputs,
  examplePayload: updateWebhookSubscriptionExamplePayload,
});
