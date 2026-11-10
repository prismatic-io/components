import { action, outputSchema } from "@prismatic-io/spectral";
import { updateEventSubscriptionOutputSchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { updateEventSubscriptionExamplePayload } from "../../examplePayloads";
import { updateEventSubscriptionInputs } from "../../inputs";

export const updateEventSubscription = action({
  display: {
    label: "Update Event Subscription Expiration",
    description: "Updates the expiration of an existing event subscription for Microsoft Outlook.",
  },
  inputs: updateEventSubscriptionInputs,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data } = await client.patch(`/subscriptions/${params.subscriptionId}`, {
      expirationDateTime: params.expirationDateTime,
    });
    return { data };
  },
  examplePerform: async () => updateEventSubscriptionExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateEventSubscriptionOutputSchema,
  }),
  examplePayload: updateEventSubscriptionExamplePayload,
});
