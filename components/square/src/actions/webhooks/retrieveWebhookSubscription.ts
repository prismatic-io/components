import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { retrieveWebhookSubscriptionExamplePayload } from "../../examplePayloads";
import { retrieveWebhookSubscriptionInputs } from "../../inputs";

export const retrieveWebhookSubscription = action({
  display: {
    label: "Retrieve Webhook Subscription",
    description: "Retrieves a webhook subscription identified by its ID.",
  },
  perform: async (context, { squareConnection, subscriptionId }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const response = await client.get(`/v2/webhooks/subscriptions/${subscriptionId}`);

    return {
      data: response.data,
    };
  },
  inputs: retrieveWebhookSubscriptionInputs,
  examplePayload: retrieveWebhookSubscriptionExamplePayload,
});
