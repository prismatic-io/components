import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deletedSubscriptionsExamplePayload } from "../../examplePayloads";
import { deleteAllSubscriptionsInputs } from "../../inputs";
import { removeSubscriptions } from "../../util";
export const deleteAllSubscription = action({
  display: {
    label: "Delete Subscriptions from an Endpoint",
    description: "Delete all subscriptions from an endpoint.",
  },
  perform: async (context, { connection, notificationUrl }) => {
    const client = createClient(connection, context.debug.enabled);
    const { subscriptionsRemoved } = await removeSubscriptions(
      client,
      new Set(notificationUrl),
    );
    return {
      data: subscriptionsRemoved,
    };
  },
  inputs: deleteAllSubscriptionsInputs,
  examplePayload: deletedSubscriptionsExamplePayload,
});
