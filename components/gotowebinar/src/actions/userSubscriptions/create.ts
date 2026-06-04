import { action } from "@prismatic-io/spectral";
import { createGotoWebinarClient } from "../../client";
import { CREATE_USER_SUBSCRIPTION_EXAMPLE_PAYLOAD } from "../../examplePayloads";
import { createUserSubscriptionInputs } from "../../inputs/subscriptions/createUserSubscriptionInputs";
import { UserSubscription } from "../../interfaces";

export const createUserSubscription = action({
  display: {
    label: "Create User Subscription",
    description: "A new user subscriptions will be created as a webhook.",
  },
  inputs: createUserSubscriptionInputs,
  examplePayload: CREATE_USER_SUBSCRIPTION_EXAMPLE_PAYLOAD,
  perform: async (
    { debug: { enabled: debug } },
    { connection, eventVersion, eventName, webhookUrl },
  ) => {
    const { client } = createGotoWebinarClient(connection, debug);
    const url = `/webhooks`;
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

    console.log({ payload: webhooks });

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
