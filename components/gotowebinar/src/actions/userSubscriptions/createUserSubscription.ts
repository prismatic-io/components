import { action } from "@prismatic-io/spectral";
import { createGotoWebinarClient } from "../../client";
import { CREATE_USER_SUBSCRIPTION_EXAMPLE_PAYLOAD } from "../../examplePayloads";
import { createUserSubscriptionInputs } from "../../inputs";
import type { UserSubscription } from "../../types";

export const createUserSubscription = action({
  display: {
    label: "Create User Subscription",
    description: "Create a new user subscription as a webhook.",
  },
  inputs: createUserSubscriptionInputs,
  examplePayload: CREATE_USER_SUBSCRIPTION_EXAMPLE_PAYLOAD,
  perform: async (
    { debug: { enabled: debug } },
    { connection, eventVersion, eventName, webhookUrl },
  ) => {
    const { client } = createGotoWebinarClient(connection, debug);
    const url = "/webhooks";
    const payload = [
      {
        eventVersion,
        eventName,
        callbackUrl: webhookUrl,
        product: "g2w",
      },
    ];

    const {
      data: {
        _embedded: { webhooks },
      },
    }: { data: { _embedded: { webhooks: UserSubscription[] } } } =
      await client.post(url, payload);

    const { webhookKey } = webhooks[0];
    const { data } = await client.post("/userSubscriptions", [
      {
        callbackUrl: webhookUrl,
        webhookKey,
        userSubscriptionState: "ACTIVE",
      },
    ]);

    return {
      data,
    };
  },
});
