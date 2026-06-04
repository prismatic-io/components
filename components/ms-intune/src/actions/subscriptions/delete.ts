import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { deleteSubscriptionInputs } from "../../inputs/subscriptions/delete";
import { NO_RESPONSE_SUCCESSFULL_PAYLOAD } from "../../constants";

export const deleteSubscription = action({
  display: {
    label: "Delete Subscription by Id",
    description: "Delete a single subscription by its ID.",
  },
  perform: async (context, { connection, subscriptionId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(`/subscriptions/${subscriptionId}`);

    return {
      data: NO_RESPONSE_SUCCESSFULL_PAYLOAD,
    };
  },
  inputs: {
    connection,
    ...deleteSubscriptionInputs,
  },
  examplePayload: { data: NO_RESPONSE_SUCCESSFULL_PAYLOAD },
});
