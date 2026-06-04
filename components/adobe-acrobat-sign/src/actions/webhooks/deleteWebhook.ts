import { action } from "@prismatic-io/spectral";
import { deleteWebhookInputs } from "../../inputs";
import { getAdobeSignClient } from "../../client";
import { deleteWebhookExamplePayload } from "../../examplePayloads";

export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Deletes a webhook.",
  },
  inputs: deleteWebhookInputs,
  perform: async (context, { connection, webhookId }) => {
    const client = getAdobeSignClient(connection, context.debug.enabled);

    await client.delete(`/webhooks/${webhookId}`);

    return {
      data: null,
    };
  },
  examplePayload: deleteWebhookExamplePayload,
});
