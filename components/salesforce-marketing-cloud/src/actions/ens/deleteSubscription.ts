import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENS_SUBSCRIPTIONS_PATH } from "../../constants";
import { deleteSubscriptionExamplePayload } from "../../examplePayloads";
import { deleteSubscriptionInputs } from "../../inputs";

export const deleteSubscription = action({
  examplePayload: deleteSubscriptionExamplePayload,
  display: {
    label: "Delete ENS Subscription",
    description: "Delete an ENS event subscription.",
  },
  inputs: deleteSubscriptionInputs,
  perform: async (context, { connection, subscriptionId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(
      `${ENS_SUBSCRIPTIONS_PATH}/${encodeURIComponent(subscriptionId)}`,
    );

    return {
      data: {
        success: true,
        subscriptionId,
        message: "Subscription deleted successfully",
      },
    };
  },
});
