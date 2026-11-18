import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { deleteSubscriptionExamplePayload } from "../../examplePayloads";
import { deleteSubscriptionInputs } from "../../inputs";
import { deleteSubscriptionOutputSchema } from "../../outputSchemas";

export const deleteSubscription = action({
  display: {
    label: "Delete Subscription by ID",
    description: "Delete a single subscription by its ID.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteSubscriptionOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, subscriptionId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(`${ENDPOINTS.SUBSCRIPTIONS}/${subscriptionId}`);

    return {
      data: {
        success: true,
        id: subscriptionId,
        message: "Subscription deleted successfully.",
      },
    };
  },
  examplePerform: async () => deleteSubscriptionExamplePayload,
  inputs: deleteSubscriptionInputs,
  examplePayload: deleteSubscriptionExamplePayload,
});
