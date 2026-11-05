import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteAllSubscriptionsInputs } from "../../inputs";
import { deleteAllSubscriptionsExamplePayload } from "../../examplePayloads/webhooks";
import { deleteAllSubscriptionsFN } from "ms-utils";

export const deleteAllInstanceSubscriptions = action({
  display: {
    label: "Delete All Instance Subscriptions",
    description: "Delete all SharePoint subscriptions pointed at this instance",
  },
  inputs: deleteAllSubscriptionsInputs,
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
  examplePayload: deleteAllSubscriptionsExamplePayload,
});
