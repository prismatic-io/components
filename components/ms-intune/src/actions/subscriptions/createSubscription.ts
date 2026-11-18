import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createSubscriptionExamplePayload } from "../../examplePayloads";
import { createSubscriptionInputs } from "../../inputs";
import { createSubscriptionOutputSchema } from "../../outputSchemas";
import { getExpirationDate, subscribeToResource } from "../../util";

export const createSubscription = action({
  display: {
    label: "Create Subscription",
    description: "Create a subscription.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createSubscriptionOutputSchema,
  }),
  performSafety: "notAllowed",
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
  examplePerform: async () => createSubscriptionExamplePayload,
  inputs: createSubscriptionInputs,
  examplePayload: createSubscriptionExamplePayload,
});
