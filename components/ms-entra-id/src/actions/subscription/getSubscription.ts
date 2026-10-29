import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getSubscriptionExamplePayload as examplePayload } from "../../examplePayloads";
import { getSubscriptionInputs as inputs } from "../../inputs/subscription";

export const getSubscription = action({
  display: {
    label: "Get Subscription",
    description: "Read properties of a subscription object.",
  },
  perform: async (context, { connection, subscriptionId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/subscriptions/${subscriptionId}`);
    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
