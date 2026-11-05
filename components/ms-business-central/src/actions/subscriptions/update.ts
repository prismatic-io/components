import { action } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../../client";
import { createSubscriptionExamplePayload as updateSubscriptionExamplePayload } from "../../examplePayloads";
import { updateSubscriptionInputs } from "../../inputs/subscriptions";

export const updateEventSubscription = action({
  display: {
    label: "Update Event Subscription",
    description: "Update existing Event subscription for Microsoft Business Central.",
  },
  inputs: updateSubscriptionInputs,
  perform: async (context, { connection, subscriptionId, etag, notificationUrl, resource }) => {
    const client = getMsBusinessCentralClient(connection, context, context.debug.enabled);
    const { data } = await client.patch(
      `/subscriptions('${subscriptionId}')`,
      {
        notificationUrl,
        resource,
      },
      {
        headers: { "If-Match": etag },
      },
    );
    return { data };
  },
  examplePayload: updateSubscriptionExamplePayload,
});
