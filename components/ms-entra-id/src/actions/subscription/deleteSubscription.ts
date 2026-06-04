import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { emptyExamplePayload as examplePayload } from "../../examplePayloads";
import { deleteSubscriptionInputs as inputs } from "../../inputs/subscription";

export const deleteSubscription = action({
  display: {
    label: "Delete Subscription",
    description: "Deletes a subscription object.",
  },
  perform: async (context, { connection, subscriptionId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(`/subscriptions/${subscriptionId}`);
    return {
      data: SUCCESS_RESPONSE,
    };
  },
  inputs,
  examplePayload,
});
