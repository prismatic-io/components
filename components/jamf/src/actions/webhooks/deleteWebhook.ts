import { action } from "@prismatic-io/spectral";
import { createClassicClient } from "../../client";
import { deleteWebhookExamplePayload } from "../../examplePayloads";
import { deleteWebhookInputs } from "../../inputs";

export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Delete a webhook subscription by ID.",
  },
  inputs: deleteWebhookInputs,
  perform: async (context, { connection, resourceId }) => {
    const client = await createClassicClient(connection, context.debug.enabled);
    await client.delete(`/webhooks/id/${resourceId}`);
    return { data: `Successfully deleted webhook ${resourceId}` };
  },
  examplePayload: deleteWebhookExamplePayload,
});
