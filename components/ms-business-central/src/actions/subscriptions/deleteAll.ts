import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { deleteAllSubscriptionsExamplePayload } from "../../examplePayloads";
import { deleteAllSubscriptionsInputs } from "../../inputs/subscriptions";
import { deleteAllSubscriptionsFn } from "../../utils";

export const deleteAllInstanceSubscriptions = action({
  display: {
    label: "Delete All Instance Subscriptions",
    description: "Delete all subscriptions pointed at this instance.",
  },
  inputs: deleteAllSubscriptionsInputs,
  perform: async (context, { connection }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const instanceWebhooks = new Set(Object.values(context.webhookUrls));
    const subscriptionsToRemove = await deleteAllSubscriptionsFn(client, instanceWebhooks);

    return { data: { subscriptionsRemoved: subscriptionsToRemove } };
  },
  examplePayload: deleteAllSubscriptionsExamplePayload,
});
