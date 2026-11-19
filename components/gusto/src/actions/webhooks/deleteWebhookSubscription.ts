import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { deleteWebhookSubscriptionInputs } from "../../inputs";
import { createWebhookClient } from "../../client";
import { deleteWebhookSubscriptionExamplePayload } from "../../examplePayloads";
import { deleteWebhookSubscriptionOutputSchema } from "../../outputSchemas";

export const deleteWebhookSubscription = action({
  display: {
    label: "Delete Webhook Subscription",
    description:
      "Deletes the Webhook Subscription associated with the provided UUID for Gusto.",
  },
  inputs: deleteWebhookSubscriptionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteWebhookSubscriptionOutputSchema,
  }),
  perform: async (context, params) => {
    const client = await createWebhookClient(
      params.connection,
      context.debug.enabled,
    );

    await client.delete(
      `/webhook_subscriptions/${params.webhookSubscriptionUuid}`,
    );
    return { data: { message: "The resource was deleted successfully." } };
  },
  performSafety: PerformSafety.NOT_ALLOWED,
  examplePayload: deleteWebhookSubscriptionExamplePayload,
});
