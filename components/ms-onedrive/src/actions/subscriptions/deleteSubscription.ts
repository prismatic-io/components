import { action } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { deleteSubscriptionExamplePayload } from "../../examplePayloads";
import { deleteSubscriptionInputs } from "../../inputs";

export const deleteSubscription = action({
  display: {
    label: "Delete Subscription",
    description: "Deletes a subscription by ID.",
  },
  inputs: deleteSubscriptionInputs,
  perform: async (context, { oneDriveConnection, subscriptionId }) => {
    const client = getOneDriveClient(oneDriveConnection, context.debug.enabled);
    const { data } = await client.delete(`/subscriptions/${subscriptionId}`);
    return { data };
  },
  examplePayload: deleteSubscriptionExamplePayload,
});
