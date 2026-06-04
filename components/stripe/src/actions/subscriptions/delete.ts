import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { deleteSubscriptionExamplePayload } from "../../examplePayloads/subscriptions";
import { connectionInput, subscriptionId, timeout } from "../../inputs";

export const deleteSubscription = action({
  display: {
    label: "Delete Subscription",
    description: "Cancel a subscription by ID.",
  },
  perform: async (context, { subscriptionId, timeout, stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    return {
      data: await client.subscriptions.cancel(util.types.toString(subscriptionId)),
    };
  },
  inputs: { subscriptionId, timeout, stripeConnection: connectionInput },
  examplePayload: deleteSubscriptionExamplePayload,
});
