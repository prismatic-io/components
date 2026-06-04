import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, subscriptionIdInput } from "../../inputs";

export const deleteSubscription = action({
  display: {
    label: "Delete Subscription (Deprecated)",
    description: "Deletes a subscription.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/subscriptions/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: subscriptionIdInput,
  },
});
