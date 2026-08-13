import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { getSubscriptionExamplePayload } from "../../examplePayloads";
import { getSubscriptionInputs } from "../../inputs";
export const getSubscription = action({
  display: {
    label: "Get Subscription",
    description: "Retrieve a single subscription.",
  },
  perform: async (context, { connection, subscriptionId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${ENDPOINTS.SUBSCRIPTIONS}/${subscriptionId}`,
    );
    return {
      data,
    };
  },
  inputs: getSubscriptionInputs,
  examplePayload: getSubscriptionExamplePayload,
});
