import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createSubscriptionExamplePayload as examplePayload } from "../../examplePayloads";
import { createSubscriptionInputs as inputs } from "../../inputs/subscription";

export const createSubscription = action({
  display: {
    label: "Create Subscription",
    description:
      "Create a subscription to receive notifications when changes occur in the specified object.",
  },
  perform: async (
    context,
    {
      connection,
      changeType,
      notificationUrl,
      resource,
      expirationDateTime,
      additionalProperties,
      headers,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const payload = {
      changeType,
      notificationUrl,
      resource,
      expirationDateTime,
      ...(additionalProperties || {}),
    };
    const { data } = await client.post(`/subscriptions`, payload, {
      headers,
    });
    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
