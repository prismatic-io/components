import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { deleteWebhookSubscriptionExamplePayload } from "../../examplePayloads";
import { deleteWebhookSubscriptionInputs } from "../../inputs";

export const deleteWebhookSubscription = action({
  display: {
    label: "Delete Webhook Subscription",
    description: "Deletes a webhook subscription.",
  },
  perform: async (context, { squareConnection, deleteSubscriptionId }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const response = await client.delete(`/v2/webhooks/subscriptions/${deleteSubscriptionId}`);

    return {
      data: response.data,
    };
  },
  inputs: deleteWebhookSubscriptionInputs,
  examplePayload: deleteWebhookSubscriptionExamplePayload,
});
