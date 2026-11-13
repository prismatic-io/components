import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteSubscriptionOutputSchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { deleteSubscriptionExamplePayload } from "../../examplePayloads";
import { deleteSubscriptionInputs } from "../../inputs";

export const deleteSubscription = action({
  display: {
    label: "Delete Subscription",
    description: "Deletes an existing subscription for Microsoft Outlook.",
  },
  inputs: deleteSubscriptionInputs,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    await client.delete(`/subscriptions/${params.subscriptionId}`);
    return {
      data: {
        success: true,
        id: params.subscriptionId,
        message: "Subscription deleted successfully",
      },
    };
  },
  examplePerform: async () => deleteSubscriptionExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteSubscriptionOutputSchema,
  }),
  examplePayload: deleteSubscriptionExamplePayload,
});
