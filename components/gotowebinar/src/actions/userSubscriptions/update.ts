import { action } from "@prismatic-io/spectral";
import { createGotoWebinarClient } from "../../client";
import { updateUserSubscriptionInputs } from "../../inputs/subscriptions/updateUserSubscriptionInputs";
import { GENERAL_DELETE_MESSAGE } from "../../constants";

export const updateUserSubscription = action({
  display: {
    label: "Update User Subscription",
    description: "Updates an existing user subscription.",
  },
  inputs: updateUserSubscriptionInputs,
  examplePayload: GENERAL_DELETE_MESSAGE,
  perform: async (
    { debug: { enabled: debug } },
    {
      connection,
      userSubscriptionKey,
      userSubscriptionState,
      webhookKey,
      callbackUrl,
    },
  ) => {
    const { client } = createGotoWebinarClient(connection, debug);
    const url = `/userSubscriptions`;
    const payload = [
      {
        callbackUrl,
        userSubscriptionKey,
        userSubscriptionState,
        webhookKey,
      },
    ];

    await client.put(url, payload);
    return GENERAL_DELETE_MESSAGE;
  },
});
