import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { deleteWebhookExamplePayload } from "../../examplePayloads";
import { deleteWebhookInputs } from "../../inputs";
export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Delete an existing webhook by ID.",
  },
  inputs: deleteWebhookInputs,
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/webhooks/${params.webhookId}`);
    return { data };
  },
  examplePayload: deleteWebhookExamplePayload,
});
