import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, subscriptionIdInput } from "../../inputs";

export const getSubscriptionPayments = action({
  display: {
    label: "Get Subscription Payments (Deprecated)",
    description: "Gets all payments of a subscription.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/subscriptions/${id}/payments`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: subscriptionIdInput,
  },
});
