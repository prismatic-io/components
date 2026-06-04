import { action } from "@prismatic-io/spectral";
import { createGotoWebinarClient } from "../../client";
import { GET_USER_SUBSCRIPTION_EXAMPLE_PAYLOAD } from "../../examplePayloads";
import { getUserSubscriptionInputs } from "../../inputs/subscriptions/getUserSubscriptionInputs";

export const getUserSubscription = action({
  display: {
    label: "Get User Subscription",
    description: "Retrieve a user subscription by User Subscription Key.",
  },
  inputs: getUserSubscriptionInputs,
  examplePayload: GET_USER_SUBSCRIPTION_EXAMPLE_PAYLOAD,
  perform: async (
    { debug: { enabled: debug } },
    { connection, userSubscriptionKey },
  ) => {
    const { client } = createGotoWebinarClient(connection, debug);
    const url = `/userSubscriptions/${userSubscriptionKey}`;

    const { data } = await client.get(url);

    return {
      data,
    };
  },
});
