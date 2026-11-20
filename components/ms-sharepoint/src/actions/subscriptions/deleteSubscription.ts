import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteSubscriptionExamplePayload } from "../../examplePayloads";
import { deleteSubscriptionInputs } from "../../inputs";
import { deleteSubscriptionOutputSchema } from "../../outputSchemas";

export const deleteSubscription = action({
  display: {
    label: "Delete Subscription",
    description: "Delete a Subscription by ID.",
  },
  inputs: deleteSubscriptionInputs,
  performSafety: "notAllowed",
  perform: async ({ debug: { enabled: debug } }, { connection, subscriptionId }) => {
    const client = await createClient(connection, debug);
    await client.delete(`/subscriptions/${subscriptionId}`);
    return {
      data: { success: true, id: subscriptionId, message: "Subscription deleted successfully" },
    };
  },
  examplePerform: async (_context, { subscriptionId }) => ({
    data: { ...deleteSubscriptionExamplePayload.data, id: subscriptionId },
  }),
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteSubscriptionOutputSchema,
  }),
  examplePayload: deleteSubscriptionExamplePayload,
});
