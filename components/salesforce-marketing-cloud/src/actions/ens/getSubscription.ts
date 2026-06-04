import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENS_SUBSCRIPTIONS_PATH } from "../../constants";
import { getSubscriptionExamplePayload } from "../../examplePayloads";
import { getSubscriptionInputs } from "../../inputs";

export const getSubscription = action({
  examplePayload: getSubscriptionExamplePayload,
  display: {
    label: "Get ENS Subscription",
    description:
      "Retrieve an Event Notification Service (ENS) subscription by ID.",
  },
  inputs: getSubscriptionInputs,
  perform: async (context, { connection, subscriptionId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${ENS_SUBSCRIPTIONS_PATH}/${encodeURIComponent(subscriptionId)}`,
    );

    return { data };
  },
});
