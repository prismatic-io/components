import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteWebhookExamplePayload } from "../../examplePayloads";
import { deleteWebhookInputs } from "../../inputs";

export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Deletes a webhook by its ID.",
  },
  perform: async (context, { connection, webhookId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/webhooks/${webhookId}`);
    return { data };
  },
  inputs: deleteWebhookInputs,
  examplePayload: deleteWebhookExamplePayload,
});
