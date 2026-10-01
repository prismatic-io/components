import { action, outputSchema } from "@prismatic-io/spectral";
import { getMondayClient } from "../../client";
import { createWebhookExamplePayload } from "../../examplePayloads";
import { createWebhookInputs } from "../../inputs";
import { createWebhookOutputSchema } from "../../outputSchemas";
import CreateWebhookMutation from "../../queries/createWebhook.gql";
export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Creates a webhook subscription for a board event.",
  },
  inputs: createWebhookInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createWebhookOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = getMondayClient(
      params.connection,
      context.debug.enabled,
      context.logger,
    );
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
  examplePerform: async (
    _context,
    { boardId, webhookEvent, webhookConfig },
  ) => ({
    data: {
      ...createWebhookExamplePayload.data,
      create_webhook: {
        ...createWebhookExamplePayload.data.create_webhook,
        board_id: boardId,
        event: webhookEvent,
        config: webhookConfig ? JSON.stringify(webhookConfig) : null,
      },
    },
  }),
  examplePayload: createWebhookExamplePayload,
});
