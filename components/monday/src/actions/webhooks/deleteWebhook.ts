import { action } from "@prismatic-io/spectral";
import { getMondayClient } from "../../client";
import { deleteWebhookExamplePayload } from "../../examplePayloads";
import { deleteWebhookInputs } from "../../inputs";
import DeleteWebhookMutation from "../../queries/deleteWebhook.gql";

export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Deletes an existing webhook subscription by ID.",
  },
  inputs: deleteWebhookInputs,
  perform: async (context, params) => {
    const client = getMondayClient(params.connection, context.debug.enabled);
    const variables = { id: params.webhookId };
    try {
      context.logger.info(`Deleting webhook ${params.webhookId}.`);
      const data = await client.request(DeleteWebhookMutation, variables);
      context.logger.info(`Webhook ${params.webhookId} deleted successfully.`);
      return { data };
    } catch (error) {
      context.logger.error(
        `Failed to delete webhook ${params.webhookId}: ${error}`,
      );
      throw error;
    }
  },
  examplePayload: deleteWebhookExamplePayload,
});
