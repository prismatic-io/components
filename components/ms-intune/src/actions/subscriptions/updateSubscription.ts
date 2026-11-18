import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { updateSubscriptionExamplePayload } from "../../examplePayloads";
import { updateSubscriptionInputs } from "../../inputs";
import { updateSubscriptionOutputSchema } from "../../outputSchemas";
import { getExpirationDate } from "../../util";

export const updateSubscription = action({
  display: {
    label: "Update Subscription",
    description: "Update a single subscription.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateSubscriptionOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, subscriptionId, expirationDateTime, notificationUrl },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const currentExpirationDateTime = getExpirationDate(expirationDateTime);
    const { data } = await client.patch(
      `${ENDPOINTS.SUBSCRIPTIONS}/${subscriptionId}`,
      {
        expirationDateTime: currentExpirationDateTime,
        notificationUrl,
      },
    );

    return {
      data,
    };
  },
  examplePerform: async () => updateSubscriptionExamplePayload,
  inputs: updateSubscriptionInputs,
  examplePayload: updateSubscriptionExamplePayload,
});
