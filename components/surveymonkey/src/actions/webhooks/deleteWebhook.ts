import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteWebhookInputs } from "../../inputs";
import { deleteWebhookExamplePayload } from "../../examplePayloads";






export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Delete a webhook subscription.",
  },
  inputs: deleteWebhookInputs,
  perform: async (context, { connection, webhookId }) => {
    const client = createClient(connection, context.debug.enabled);

    await client.delete(`/webhooks/${webhookId}`);

    return {
      data: {
        success: true,
        webhookId,
        message: `Webhook ${webhookId} has been deleted.`,
      },
    };
  },
  examplePayload: deleteWebhookExamplePayload,
});
