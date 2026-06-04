import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { deleteAllSubscriptionsInputs } from "../../inputs/subscriptions/delete";
import { removeSubscriptions } from "../../util";
import { deletedSubscriptionsExamplePayload } from "../../examplePayloads";

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
  inputs: {
    connection,
    ...deleteAllSubscriptionsInputs,
  },
  examplePayload: deletedSubscriptionsExamplePayload,
});
