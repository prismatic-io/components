import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteSubscriptionExamplePayload } from "../../examplePayloads/notifications";
import {
  connectionInput,
  notificationType,
  subscriptionId,
} from "../../inputs";

export const deleteSubscription = action({
  display: {
    label: "Delete Subscription By ID",
    description:
      "Deletes the subscription indicated by the subscription identifier and notification type that you specify.",
  },
  examplePayload: deleteSubscriptionExamplePayload,
  inputs: {
    connectionInput,
    subscriptionId: {
      ...subscriptionId,
      comments: "The identifier for the subscription that you want to delete.",
    },
    notificationType,
  },
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
});
