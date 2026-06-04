import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, subscriptionIdInput } from "../../inputs";

export const getSubscription = action({
  display: {
    label: "Get Subscription (Deprecated)",
    description: "Gets details of a subscription.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/subscriptions/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: subscriptionIdInput,
  },
});
