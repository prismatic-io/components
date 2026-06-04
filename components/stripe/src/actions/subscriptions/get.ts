import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { getSubscriptionExamplePayload } from "../../examplePayloads/subscriptions";
import { connectionInput, subscriptionId, timeout } from "../../inputs";

export const getSubscription = action({
  display: {
    label: "Get Subscription",
    description: "Retrieve the information and metadata of a subscription by ID.",
  },
  perform: async (context, { subscriptionId, timeout, stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    return {
      data: await client.subscriptions.retrieve(util.types.toString(subscriptionId)),
    };
  },
  inputs: { subscriptionId, timeout, stripeConnection: connectionInput },
  examplePayload: getSubscriptionExamplePayload,
});
