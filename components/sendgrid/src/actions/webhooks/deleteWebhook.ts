import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { deleteWebhookInputs } from "../../inputs";
import { deleteWebhookExamplePayload } from "../../examplePayloads";
import { deleteWebhookHelper } from "../../helpers";

export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Delete an Event Webhook configuration.",
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
