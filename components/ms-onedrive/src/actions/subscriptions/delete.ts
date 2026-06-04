import { action } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { oneDriveConnection, subscriptionId } from "../../inputs";
import { deleteSubscriptionExamplePayload } from "../../examplePayloads";

export const deleteSubscription = action({
  display: {
    label: "Delete a Subscription",
    description: "Delete a Subscription by ID",
  },
  inputs: {
    oneDriveConnection,
    subscriptionId,
  },
  perform: async (context, { oneDriveConnection, subscriptionId }) => {
    const client = getOneDriveClient(oneDriveConnection, context.debug.enabled);
    const { data } = await client.delete(`/subscriptions/${subscriptionId}`);
    return { data };
  },
  examplePayload: deleteSubscriptionExamplePayload,
});
