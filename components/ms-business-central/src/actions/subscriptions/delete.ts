import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { NO_CONTENT_RESPONSE } from "../../constants";
import { noContentExamplePayload } from "../../examplePayloads";
import { deleteSubscriptionInputs } from "../../inputs/subscriptions";

export const deleteSubscription = action({
  display: {
    label: "Delete Subscription",
    description: "Delete existing subscription for Microsoft Business Central.",
  },
  inputs: deleteSubscriptionInputs,
  perform: async (context, { connection, subscriptionId, etag }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    await client.delete(`/subscriptions('${subscriptionId}')`, {
      headers: { "If-Match": etag },
    });
    return { data: NO_CONTENT_RESPONSE };
  },
  examplePayload: noContentExamplePayload,
});
