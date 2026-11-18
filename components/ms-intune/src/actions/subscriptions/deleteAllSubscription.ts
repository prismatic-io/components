import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteAllSubscriptionExamplePayload } from "../../examplePayloads";
import { deleteAllSubscriptionInputs } from "../../inputs";
import { deleteAllSubscriptionOutputSchema } from "../../outputSchemas";
import { removeSubscriptions } from "../../util";

export const deleteAllSubscription = action({
  display: {
    label: "Delete Subscriptions from Endpoint",
    description: "Delete all subscriptions from an endpoint.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteAllSubscriptionOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, notificationUrl }) => {
    const client = createClient(connection, context.debug.enabled);
    const { subscriptionsRemoved } = await removeSubscriptions(
      client,
      new Set([notificationUrl]),
    );

    return {
      data: subscriptionsRemoved,
    };
  },
  examplePerform: async () => deleteAllSubscriptionExamplePayload,
  inputs: deleteAllSubscriptionInputs,
  examplePayload: deleteAllSubscriptionExamplePayload,
});
