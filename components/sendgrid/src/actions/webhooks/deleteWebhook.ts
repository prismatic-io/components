import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { deleteWebhookExamplePayload } from "../../examplePayloads";
import { deleteWebhookHelper } from "../../helpers";
import { deleteWebhookInputs } from "../../inputs";
export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Deletes an Event Webhook configuration.",
  },
  inputs: deleteWebhookInputs,
  perform: async (_context, { sendGridConnection, webhookId }) => {
    const client = createAuthorizedClient(sendGridConnection);
    const data = await deleteWebhookHelper(client, {
      webhookId,
    });
    return {
      data,
    };
  },
  examplePayload: deleteWebhookExamplePayload,
});
