import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteWebhookSubscriptionOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { deleteWebhookSubscriptionInputs } from "../../inputs";
import { deleteWebhookSubscriptionExamplePayload } from "../../examplePayloads";
import { deleteWebhook } from "../../util";
export const deleteWebhookSubscription = action({
  display: {
    label: "Delete Webhook Subscription",
    description: "Delete a Webhook Subscription.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, webhookUuid }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const data = await deleteWebhook(client, webhookUuid);
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: deleteWebhookSubscriptionExamplePayload.data,
  }),
  inputs: deleteWebhookSubscriptionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteWebhookSubscriptionOutputSchema,
  }),
  examplePayload: deleteWebhookSubscriptionExamplePayload,
});
