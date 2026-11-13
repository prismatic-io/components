import { action, outputSchema } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { deleteSubscriptionsExamplePayload } from "../../examplePayloads";
import { deleteSubscriptionsInputs } from "../../inputs";
import { deleteSubscriptionsOutputSchema } from "../../outputSchemas";
import type { GraphListResponse, Subscription } from "../../types";

export const deleteSubscriptions = action({
  display: {
    label: "Delete All Instanced Subscriptions",
    description: "Deletes all existing subscriptions for this instance.",
  },
  inputs: deleteSubscriptionsInputs,
  performSafety: "notAllowed",
  perform: async (context, { oneDriveConnection }) => {
    const client = getOneDriveClient(oneDriveConnection, context.debug.enabled);

    const {
      data: { value: subscriptions },
    } = await client.get<GraphListResponse<Subscription>>(`/subscriptions`);
    if (subscriptions.length === 0) {
      return {
        data: {
          message: "No subscriptions found",
        },
      };
    }
    const instanceWebhooks = new Set(Object.values(context.webhookUrls));
    const subscriptionsToRemove = subscriptions
      .filter(({ notificationUrl }) => instanceWebhooks.has(notificationUrl))
      .map(({ id }) => id);

    await Promise.all(
      subscriptionsToRemove.map((id) => client.delete(`/subscriptions/${id}`)),
    );

    return { data: { subscriptionsRemoved: subscriptionsToRemove } };
  },
  examplePerform: async () => deleteSubscriptionsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteSubscriptionsOutputSchema,
  }),
  examplePayload: deleteSubscriptionsExamplePayload,
});
