import { action } from "@prismatic-io/spectral";
import type { Subscription } from "@microsoft/microsoft-graph-types";
import { createClient } from "../../client";
import { deleteAllInstanceSubscriptionsExamplePayload } from "../../examplePayloads";
import { deleteAllInstanceSubscriptionsInputs } from "../../inputs";
import { fetchAllData } from "../../util";

export const deleteAllInstanceSubscriptions = action({
  display: {
    label: "Delete All Instance Subscriptions",
    description: "Deletes all subscriptions pointed at this instance.",
  },
  inputs: deleteAllInstanceSubscriptionsInputs,
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const data = await fetchAllData<Subscription>(client, "/subscriptions", true, {});
    const instanceWebhooks = new Set(Object.values(context.webhookUrls));
    const subscriptionsToRemove = data.value
      .filter(({ notificationUrl }) => instanceWebhooks.has(notificationUrl ?? ""))
      .map(({ id }) => id);

    await Promise.all(subscriptionsToRemove.map((id) => client.delete(`/subscriptions/${id}`)));

    return { data: { subscriptionsRemoved: subscriptionsToRemove } };
  },
  examplePayload: deleteAllInstanceSubscriptionsExamplePayload,
});
