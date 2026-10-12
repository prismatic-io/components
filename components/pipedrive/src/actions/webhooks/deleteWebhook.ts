import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteWebhookInputs } from "../../inputs";
import { deleteWebhook as deleteWebhookFn } from "../../util";
import { deleteWebhookExamplePayload } from "../../examplePayloads";
import { deleteWebhookOutputSchema } from "../../outputSchemas";
export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Deletes a webhook.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, webhookId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await deleteWebhookFn(client, webhookId);
    return { data };
  },
  inputs: deleteWebhookInputs,
  examplePayload: deleteWebhookExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteWebhookOutputSchema,
  }),
});
