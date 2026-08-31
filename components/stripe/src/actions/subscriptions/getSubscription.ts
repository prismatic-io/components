import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { getSubscriptionExamplePayload } from "../../examplePayloads/subscriptions";
import { getSubscriptionInputs } from "../../inputs";
import { subscriptionOutputSchema } from "../../outputSchemas";
export const getSubscription = action({
  display: {
    label: "Get Subscription",
    description:
      "Retrieve the information and metadata of a subscription by ID.",
  },
  performSafety: "safe",
  perform: async (context, { subscriptionId, timeout, stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    return {
      data: await client.subscriptions.retrieve(
        util.types.toString(subscriptionId),
      ),
    };
  },
  inputs: getSubscriptionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: subscriptionOutputSchema,
  }),
  examplePayload: getSubscriptionExamplePayload,
});
