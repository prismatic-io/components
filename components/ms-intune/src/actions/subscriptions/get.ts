import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { getSubscriptionExamplePayload } from "../../examplePayloads";
import { subscriptionId } from "../../inputs/subscriptions/general";

export const getSubscription = action({
  display: {
    label: "Get Subscription",
    description: "Retrieve a single subscription.",
  },
  perform: async (context, { connection, subscriptionId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/subscriptions/${subscriptionId}`);

    return {
      data,
    };
  },
  inputs: {
    connection,
    subscriptionId,
  },
  examplePayload: getSubscriptionExamplePayload,
});
