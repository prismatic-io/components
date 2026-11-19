import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { listWebhookSubscriptionsInputs } from "../../inputs";
import { createWebhookClient } from "../../client";
import { listWebhookSubscriptionsExamplePayload } from "../../examplePayloads";
import { listWebhookSubscriptionsOutputSchema } from "../../outputSchemas";

export const listWebhookSubscriptions = action({
  display: {
    label: "List Webhook Subscriptions",
    description:
      "Returns all webhook subscriptions associated with the provided Partner API token for Gusto.",
  },
  inputs: listWebhookSubscriptionsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listWebhookSubscriptionsOutputSchema,
  }),
  perform: async (context, params) => {
    const client = await createWebhookClient(
      params.connection,
      context.debug.enabled,
    );
    const { data, headers } = await client.get(`/webhook_subscriptions`);
    return { data: { data, headers } };
  },
  performSafety: PerformSafety.SAFE,
  examplePayload: listWebhookSubscriptionsExamplePayload,
});
