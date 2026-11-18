import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getSubscriptionExamplePayload as examplePayload } from "../../examplePayloads";
import { getSubscriptionInputs as inputs } from "../../inputs/subscription";
import { getSubscriptionOutputSchema } from "../../outputSchemas";

export const getSubscription = action({
  display: {
    label: "Get Subscription",
    description: "Read properties of a subscription object.",
  },
  performSafety: "safe",
  perform: async (context, { connection, subscriptionId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/subscriptions/${subscriptionId}`);
    return {
      data,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getSubscriptionOutputSchema,
  }),
  examplePayload,
});
