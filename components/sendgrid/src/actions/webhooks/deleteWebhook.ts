import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { deleteWebhookExamplePayload } from "../../examplePayloads";
import { deleteWebhookHelper } from "../../helpers";
import { deleteWebhookInputs } from "../../inputs";
import { deleteWebhookOutputSchema } from "../../outputSchemas";
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteWebhookOutputSchema,
  }),
  examplePayload: deleteWebhookExamplePayload,
});
