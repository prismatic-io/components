import {
  type ActionContext,
  type Connection,
  type TriggerPayload,
  util,
} from "@prismatic-io/spectral";
import { createShipStationClient } from "../client";
import type { WebhookFlowState, WebhookSubscriptionParams } from "../types";

const getBase64FromUrl = (url: string): string =>
  Buffer.from(url).toString("base64");

export const createWebhookSubscription = async (
  context: ActionContext,
  {
    connection,
    webhookEvent,
    storeId,
    friendlyName,
  }: WebhookSubscriptionParams,
) => {
  const flowName = context.flow.name;
  const webhookUrl = context.webhookUrls[flowName];
  const stateKey = getBase64FromUrl(webhookUrl);
  const existingState = context.crossFlowState[stateKey] as
    | WebhookFlowState
    | undefined;

  const client = createShipStationClient(connection);

  if (existingState?.webhookId) {
    const isSameEvent = existingState.previousEvent === webhookEvent;
    const isSameStore = existingState.previousStoreId === (storeId || null);

    if (isSameEvent && isSameStore) {
      context.logger.info(
        `Webhook ${existingState.webhookId} already exists with same config for flow ${flowName}, skipping creation`,
      );
      return;
    }

    context.logger.info(
      `Inputs changed for flow ${flowName}, recreating webhook ${existingState.webhookId}`,
    );
    await client.delete(`/webhooks/${existingState.webhookId}`);
  }

  const body = {
    target_url: webhookUrl,
    event: webhookEvent,
    store_id: storeId,
    friendly_name: friendlyName || `ShipStation Flow - ${flowName}`,
  };

  const { data } = await client.post("/webhooks/subscribe", body);

  const crossFlowState = {
    ...context.crossFlowState,
    [stateKey]: {
      webhookId: data.id,
      previousEvent: webhookEvent,
      previousStoreId: storeId || null,
    } as WebhookFlowState,
  };

  context.logger.info(`Created webhook ${data.id} for flow ${flowName}`);

  return { crossFlowState };
};

export const deleteWebhookSubscription = async (
  context: ActionContext,
  { connection }: { connection: Connection },
) => {
  const flowName = context.flow.name;
  const webhookUrl = context.webhookUrls[flowName];
  const stateKey = getBase64FromUrl(webhookUrl);
  const existingState = context.crossFlowState[stateKey] as
    | WebhookFlowState
    | undefined;

  if (!existingState?.webhookId) {
    context.logger.info(
      `No webhook ID stored for flow ${flowName}, skipping deletion`,
    );
    return;
  }

  const client = createShipStationClient(connection);
  const { webhookId } = existingState;

  await client.delete(`/webhooks/${webhookId}`);

  const crossFlowState = {
    ...context.crossFlowState,
    [stateKey]: undefined,
  };

  context.logger.info(`Deleted webhook ${webhookId} for flow ${flowName}`);

  return { crossFlowState };
};

export const webhookPerformFN = async (
  _context: ActionContext,
  payload: TriggerPayload,
) => {
  return Promise.resolve({
    payload,
    response: { statusCode: 200, contentType: "application/json" },
  });
};
