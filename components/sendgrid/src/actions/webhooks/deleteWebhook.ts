import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { deleteWebhookExamplePayload } from "../../examplePayloads";
import { deleteWebhookInputs } from "../../inputs";
import { deleteWebhookOutputSchema } from "../../outputSchemas";
import { deleteWebhookHelper } from "../../util";
export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Deletes an Event Webhook configuration.",
  },
  inputs: deleteWebhookInputs,
  performSafety: "notAllowed",
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
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: deleteWebhookExamplePayload.data,
  }),
  examplePayload: deleteWebhookExamplePayload,
});
