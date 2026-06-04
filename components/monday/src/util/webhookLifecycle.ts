import type { ActionContext, Connection } from "@prismatic-io/spectral";
import { getMondayClient } from "../client";
import CreateWebhookMutation from "../queries/createWebhook.gql";
import DeleteWebhookMutation from "../queries/deleteWebhook.gql";
import ListBoardWebhooksQuery from "../queries/listBoardWebhooks.gql";
import type { CreateWebhookResponse, ListWebhooksResponse } from "../types";

const getBase64FromUrl = (url: string): string => {
  const lastPathSegmentMatch = url.match(/\/([^/]+)$/);
  return lastPathSegmentMatch ? lastPathSegmentMatch[1] : "";
};

export const onWebhookCreate = async (
  context: ActionContext,
  {
    connection,
    boardId,
    webhookEvent,
    webhookConfig,
  }: {
    connection: Connection;
    boardId: number;
    webhookEvent: string;
    webhookConfig?: object;
  },
) => {
  const client = getMondayClient(connection, context.debug.enabled);
  const webhookUrl = context.webhookUrls[context.flow.name];
  const stateKey = getBase64FromUrl(webhookUrl);
  const state = context.crossFlowState as Record<string, unknown>;

  
  const previousWebhookId = state[stateKey] as string | undefined;
  if (previousWebhookId) {
    context.logger.info(
      `Found existing webhook ${previousWebhookId}, deleting before re-creation.`,
    );
    try {
      await client.request(DeleteWebhookMutation, { id: previousWebhookId });
    } catch {
      context.logger.warn(
        `Failed to delete existing webhook ${previousWebhookId}. It may have already been deleted manually.`,
      );
    }
  }

  try {
    const variables = {
      board_id: boardId,
      url: webhookUrl,
      event: webhookEvent,
      config: webhookConfig ? JSON.stringify(webhookConfig) : undefined,
    };

    context.logger.info(
      `Creating webhook for board ${boardId} with event "${webhookEvent}".`,
    );

    const data = await client.request<CreateWebhookResponse>(
      CreateWebhookMutation,
      variables,
    );

    state[stateKey] = data.create_webhook.id;
    context.logger.info(
      `Webhook ${data.create_webhook.id} created successfully.`,
    );
  } catch (error) {
    context.logger.error(
      `Failed to create webhook for board ${boardId}: ${error}`,
    );
    throw error;
  }
};

export const onWebhookDelete = async (
  context: ActionContext,
  {
    connection,
    boardId,
  }: {
    connection: Connection;
    boardId: number;
  },
) => {
  const client = getMondayClient(connection, context.debug.enabled);
  const webhookUrl = context.webhookUrls[context.flow.name];
  const stateKey = getBase64FromUrl(webhookUrl);
  const state = context.crossFlowState as Record<string, unknown>;
  const storedWebhookId = state[stateKey] as string | undefined;

  if (storedWebhookId) {
    context.logger.info(`Deleting stored webhook ${storedWebhookId}.`);
    try {
      await client.request(DeleteWebhookMutation, { id: storedWebhookId });
      delete state[stateKey];
      context.logger.info(`Webhook ${storedWebhookId} deleted successfully.`);
    } catch (error) {
      context.logger.error(
        `Failed to delete webhook ${storedWebhookId}: ${error}`,
      );
      throw error;
    }
    return;
  }

  
  context.logger.info(
    `No stored webhook ID found. Searching board ${boardId} for webhooks matching the instance URL.`,
  );

  try {
    const data = await client.request<ListWebhooksResponse>(
      ListBoardWebhooksQuery,
      { board_id: boardId },
    );

    const webhooks = data.webhooks ?? [];

    for (const webhook of webhooks) {
      try {
        const config = JSON.parse(webhook.config || "{}");
        if (config.url === webhookUrl) {
          context.logger.info(
            `Found matching webhook ${webhook.id}, deleting.`,
          );
          await client.request(DeleteWebhookMutation, { id: webhook.id });
        }
      } catch {
        
      }
    }
  } catch (error) {
    context.logger.error(
      `Failed to list webhooks for board ${boardId}: ${error}`,
    );
    throw error;
  }
};
