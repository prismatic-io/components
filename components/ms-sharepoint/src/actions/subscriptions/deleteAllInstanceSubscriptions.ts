import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteAllSubscriptionsFN } from "ms-utils";
import { createClient } from "../../client";
import { deleteAllInstanceSubscriptionsExamplePayload } from "../../examplePayloads";
import { deleteAllInstanceSubscriptionsInputs } from "../../inputs";
import { deleteAllInstanceSubscriptionsOutputSchema } from "../../outputSchemas";

export const deleteAllInstanceSubscriptions = action({
  display: {
    label: "Delete All Instance Subscriptions",
    description: "Delete all SharePoint subscriptions pointed at this instance.",
  },
  inputs: deleteAllInstanceSubscriptionsInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, notificationUrl }) => {
    const client = await createClient(connection, context.debug.enabled);
    const endpoint = notificationUrl || context.webhookUrls[context.flow.name];

    const deletedSubscriptions = await deleteAllSubscriptionsFN(client, endpoint);

    return {
      data: {
        subscriptionsRemoved: deletedSubscriptions.map((s) => s.id),
        count: deletedSubscriptions.length,
      },
    };
  },
  examplePerform: async () => deleteAllInstanceSubscriptionsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteAllInstanceSubscriptionsOutputSchema,
  }),
  examplePayload: deleteAllInstanceSubscriptionsExamplePayload,
});
