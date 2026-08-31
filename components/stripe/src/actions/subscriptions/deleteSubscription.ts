import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { deleteSubscriptionExamplePayload } from "../../examplePayloads/subscriptions";
import { deleteSubscriptionInputs } from "../../inputs";
import { subscriptionOutputSchema } from "../../outputSchemas";
export const deleteSubscription = action({
  display: {
    label: "Delete Subscription",
    description: "Cancel a subscription by ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, { subscriptionId, timeout, stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    return {
      data: await client.subscriptions.cancel(
        util.types.toString(subscriptionId),
      ),
    };
  },
  examplePerform: async (
    _context,
    { subscriptionId },
  ): Promise<{
    data: unknown;
  }> => {
    const subscription = deleteSubscriptionExamplePayload.data as Record<
      string,
      unknown
    >;
    return {
      data: {
        ...subscription,
        id: subscriptionId ?? subscription.id,
      },
    };
  },
  inputs: deleteSubscriptionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: subscriptionOutputSchema,
  }),
  examplePayload: deleteSubscriptionExamplePayload,
});
