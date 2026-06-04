import { action } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { oneDriveConnection } from "../../inputs";
import { deleteAllSubscriptionsExamplePayload } from "../../examplePayloads";

export const deleteSubscriptions = action({
  display: {
    label: "Delete all Instanced Subscriptions",
    description: "Delete all existing subscriptions for this instance",
  },
  inputs: {
    oneDriveConnection,
  },
  perform: async (context, { oneDriveConnection }) => {
    const client = getOneDriveClient(oneDriveConnection, context.debug.enabled);

    const {
      data: { value: subscriptions },
    } = await client.get<{
      value: { notificationUrl: string; id: string }[];
    }>(`/subscriptions`);
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
  examplePayload: deleteAllSubscriptionsExamplePayload,
});
