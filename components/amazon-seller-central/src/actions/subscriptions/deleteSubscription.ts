import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteSubscriptionExamplePayload } from "../../examplePayloads/notifications";
import { deleteSubscriptionInputs } from "../../inputs";
import { deleteSubscriptionOutputSchema } from "../../outputSchemas";

export const deleteSubscription = action({
  display: {
    label: "Delete Subscription By ID",
    description:
      "Deletes the subscription indicated by the subscription identifier and the specified notification type.",
  },
  examplePayload: deleteSubscriptionExamplePayload,
  inputs: deleteSubscriptionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteSubscriptionOutputSchema,
  }),
  performSafety: PerformSafety.NOT_ALLOWED,
  perform: async (
    context,
    { connectionInput, subscriptionId, notificationType },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.delete(
      `/notifications/v1/subscriptions/${notificationType}/${subscriptionId}`,
    );
    return {
      data,
    };
  },
  examplePerform: async () => deleteSubscriptionExamplePayload,
});
