import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteWebhookPayload } from "../../examplePayloads";
import { deleteWebhookInputs } from "../../inputs";
import { deleteWebhookOutputSchema } from "../../outputSchemas";
import { deleteWebhookGql } from "../graphql/webhooks/deleteWebhookGql";

export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Deletes a webhook by ID.",
  },
  inputs: deleteWebhookInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteWebhookOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const { data } = await deleteWebhookGql.perform(context, {
      shopifyConnection: params.shopifyConnection,
      webhookId: `gid://shopify/WebhookSubscription/${params.webhookId}`,
    });

    return { data };
  },
  examplePerform: async () => ({
    data: {},
  }),
  examplePayload: deleteWebhookPayload,
});
