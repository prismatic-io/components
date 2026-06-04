import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteWebhookInputs } from "../../inputs";
import { deleteWebhook as deleteWebhookFn } from "../../util";

export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Deletes a webhook.",
  },
  perform: async (context, { connection, webhookId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await deleteWebhookFn(client, webhookId);
    return { data };
  },
  inputs: deleteWebhookInputs,
});
