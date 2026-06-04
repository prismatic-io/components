import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { getSubscriptionExamplePayload as updateSubscriptionExamplePayload } from "../../examplePayloads";
import { updateSubscriptionInputs } from "../../inputs/subscriptions/update";
import { getExpirationDate } from "../../util";

export const updateSubscription = action({
  display: {
    label: "Update Subscription",
    description: "Update a single subscription.",
  },
  perform: async (
    context,
    { connection, subscriptionId, expirationDateTime, notificationUrl },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const currentExpirationDateTime = getExpirationDate(expirationDateTime);
    const { data } = await client.patch(`/subscriptions/${subscriptionId}`, {
      expirationDateTime: currentExpirationDateTime,
      notificationUrl,
    });

    return {
      data,
    };
  },
  inputs: {
    connection,
    ...updateSubscriptionInputs,
  },
  examplePayload: updateSubscriptionExamplePayload,
});
