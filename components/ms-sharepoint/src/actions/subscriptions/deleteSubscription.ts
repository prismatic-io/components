import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteSubscriptionExamplePayload } from "../../examplePayloads";
import { deleteSubscriptionInputs } from "../../inputs";

export const deleteSubscription = action({
  display: {
    label: "Delete Subscription",
    description: "Delete a Subscription by ID.",
  },
  inputs: deleteSubscriptionInputs,
  performSafety: "notAllowed",
  perform: async ({ debug: { enabled: debug } }, { connection, subscriptionId }) => {
    const client = await createClient(connection, debug);
    const { data } = await client.delete(`/subscriptions/${subscriptionId}`);
    return { data };
  },
  examplePerform: async () => deleteSubscriptionExamplePayload,
  examplePayload: deleteSubscriptionExamplePayload,
});
