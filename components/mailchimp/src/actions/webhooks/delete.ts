import { action } from "@prismatic-io/spectral";
import { deleteWebhookInputs } from "../../inputs";
import { deleteWebhookExamplePayload } from "../../examplePayloads";
import { deleteWebhook } from "../../utils/webhooks";

export default action({
  display: {
    label: "Delete Webhook",
    description: "Delete a webhook from a specific list/audience.",
  },
  inputs: deleteWebhookInputs,
  examplePayload: deleteWebhookExamplePayload,
  perform: async (_context, { connection, listId, webhookId }) => {
    await deleteWebhook(connection, listId, webhookId);
    return { data: { success: true, message: "Webhook deleted successfully" } };
  },
});
