import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteWebhookExamplePayload } from "../../examplePayloads";
import { connectionInput, version, webhookId } from "../../inputs";

export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Delete a Webhook by Webhook ID",
  },
  perform: async (context, { connectionInput, version, webhookId }) => {
    const client = createClient(
      connectionInput,
      version,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/webhook/${webhookId}`);
    return { data };
  },
  inputs: {
    connectionInput,
    version,
    webhookId,
  },
  examplePayload: deleteWebhookExamplePayload,
});
