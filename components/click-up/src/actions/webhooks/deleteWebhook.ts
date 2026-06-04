import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { deleteWebhookExamplePayload } from "../../examplePayloads";
import { connectionInput, getWebhookId } from "../../inputs";

const webhookId = getWebhookId(true, "Webhook ID");

export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Delete a webhook.",
  },
  examplePayload: deleteWebhookExamplePayload,
  perform: async (context, { clickUpConnection, webhookId }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);

    const { data } = await client.delete(`/webhook/${webhookId}`);

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    webhookId,
  },
});
