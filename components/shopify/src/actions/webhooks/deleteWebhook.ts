import { action } from "@prismatic-io/spectral";
import { deleteWebhookInputs } from "../../inputs";
import { deleteWebhookGql } from "../graphql/webhooks/deleteWebhook";

export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Deletes a webhook by ID.",
  },
  inputs: deleteWebhookInputs,
  perform: async (context, params) => {
    const { data } = await deleteWebhookGql.perform(context, {
      shopifyConnection: params.shopifyConnection,
      webhookId: `gid://shopify/WebhookSubscription/${params.webhookId}`,
    });

    return { data };
  },
  examplePayload: { data: {} },
});
