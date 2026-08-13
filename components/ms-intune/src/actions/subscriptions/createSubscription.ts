import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getSubscriptionExamplePayload as createSubscriptionExamplePayload } from "../../examplePayloads";
import { createSubscriptionInputs } from "../../inputs";
import { getExpirationDate, subscribeToResource } from "../../util";
export const createSubscription = action({
  display: {
    label: "Create Subscription",
    description: "Create a subscription.",
  },
  perform: async (
    context,
    {
      connection,
      expirationDateTime,
      notificationUrl,
      bodyFields,
      changeType,
      lifecycleNotificationUrl,
      resource,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const currentExpirationDateTime = getExpirationDate(expirationDateTime);
    const data = await subscribeToResource(
      client,
      notificationUrl,
      resource,
      changeType,
      currentExpirationDateTime,
      {
        ...bodyFields,
        lifecycleNotificationUrl,
      },
    );
    return {
      data,
    };
  },
  inputs: createSubscriptionInputs,
  examplePayload: createSubscriptionExamplePayload,
});
