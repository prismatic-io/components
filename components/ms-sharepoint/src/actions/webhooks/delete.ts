import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, subscriptionId } from "../../inputs";

export const deleteSubscription = action({
  display: {
    label: "Delete a Subscription",
    description: "Delete a Subscription by ID",
  },
  inputs: {
    connection,
    subscriptionId,
  },
  perform: async ({ debug: { enabled: debug } }, { connection, subscriptionId }) => {
    const client = await createClient(connection, debug);
    const { data } = await client.delete(`/subscriptions/${subscriptionId}`);
    return { data };
  },
  examplePayload: {
    data: {},
  },
});
