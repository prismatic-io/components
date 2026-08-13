import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS, NO_RESPONSE_SUCCESSFULL_PAYLOAD } from "../../constants";
import { deleteSubscriptionExamplePayload } from "../../examplePayloads";
import { deleteSubscriptionInputs } from "../../inputs";
export const deleteSubscription = action({
  display: {
    label: "Delete Subscription by ID",
    description: "Delete a single subscription by its ID.",
  },
  perform: async (context, { connection, subscriptionId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(`${ENDPOINTS.SUBSCRIPTIONS}/${subscriptionId}`);
    return {
      data: NO_RESPONSE_SUCCESSFULL_PAYLOAD,
    };
  },
  inputs: deleteSubscriptionInputs,
  examplePayload: deleteSubscriptionExamplePayload,
});
