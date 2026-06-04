import { action } from "@prismatic-io/spectral";
import { getMondayClient } from "../../client";
import { createWebhookExamplePayload } from "../../examplePayloads";
import { createWebhookInputs } from "../../inputs";
import CreateWebhookMutation from "../../queries/createWebhook.gql";

export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Creates a webhook subscription for a board event.",
  },
  inputs: createWebhookInputs,
  perform: async (context, params) => {
    const client = getMondayClient(params.connection, context.debug.enabled);
    const variables = {
      board_id: params.boardId,
      url: params.webhookUrl,
      event: params.webhookEvent,
      config: params.webhookConfig
        ? JSON.stringify(params.webhookConfig)
        : undefined,
    };
    try {
      context.logger.info(
        `Creating webhook for board ${params.boardId} with event "${params.webhookEvent}".`,
      );
      const data = await client.request(CreateWebhookMutation, variables);
      context.logger.info(`Webhook created successfully.`);
      return { data };
    } catch (error) {
      context.logger.error(
        `Failed to create webhook for board ${params.boardId}: ${error}`,
      );
      throw error;
    }
  },
  examplePayload: createWebhookExamplePayload,
});
