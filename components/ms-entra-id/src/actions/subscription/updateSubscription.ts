import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateSubscriptionExamplePayload as examplePayload } from "../../examplePayloads";
import { updateSubscriptionInputs as inputs } from "../../inputs/subscription";
import { updateSubscriptionOutputSchema } from "../../outputSchemas";

export const updateSubscription = action({
  display: {
    label: "Update Subscription",
    description:
      "Updates a subscription expiration time for renewal and/or updates the notificationUrl for delivery.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, subscriptionId, notificationUrl, expirationDateTime },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const payload = {
      notificationUrl,
      expirationDateTime,
    };
    const { data } = await client.patch(
      `/subscriptions/${subscriptionId}`,
      payload,
    );
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    { subscriptionId, notificationUrl, expirationDateTime },
  ) => ({
    data: {
      ...examplePayload.data,
      id: subscriptionId,
      ...(notificationUrl && { notificationUrl }),
      ...(expirationDateTime && { expirationDateTime }),
    },
  }),
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateSubscriptionOutputSchema,
  }),
  examplePayload,
});
