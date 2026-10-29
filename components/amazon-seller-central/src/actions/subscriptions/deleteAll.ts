import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteAllSubscriptionsExamplePayload } from "../../examplePayloads/notifications";
import {
  connectionInput,
  notificationType,
  subscriptionId,
} from "../../inputs";

export const deleteInstancedSubscriptions = action({
  display: {
    label: "Delete Instanced Subscriptions",
    description: "Delete all webhooks that point to a flow in this instance",
  },
  examplePayload: deleteAllSubscriptionsExamplePayload,
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
