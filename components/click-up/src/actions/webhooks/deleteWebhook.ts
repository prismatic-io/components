import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { deleteWebhookExamplePayload } from "../../examplePayloads";
import { deleteWebhookInputs } from "../../inputs";
export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Delete a webhook.",
  },
  examplePayload: deleteWebhookExamplePayload,
  performSafety: "notAllowed",
  perform: async (context, { clickUpConnection, webhookId }) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/webhook/${webhookId}`);
    return {
      data,
    };
  },
  examplePerform: async () => deleteWebhookExamplePayload,
  inputs: deleteWebhookInputs,
});
