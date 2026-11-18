import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteSubscriptionExamplePayload as examplePayload } from "../../examplePayloads";
import { deleteSubscriptionInputs as inputs } from "../../inputs/subscription";
import { deleteSubscriptionOutputSchema } from "../../outputSchemas";

export const deleteSubscription = action({
  display: {
    label: "Delete Subscription",
    description: "Deletes a subscription object.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, subscriptionId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(`/subscriptions/${subscriptionId}`);
    return {
      data: {
        success: true,
        id: subscriptionId,
        message: "Subscription deleted successfully",
      },
    };
  },
  examplePerform: async () => examplePayload,
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteSubscriptionOutputSchema,
  }),
  examplePayload,
});
