import {
  type ActionContext,
  type HttpResponse,
  type TriggerPayload,
  util,
} from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { createClient } from "../client";
import type {
  CreateEventHookData,
  CreateEventHookTriggerData,
  EventHookDeletion,
  Webhook,
} from "../interfaces/webhook";
import { EVENT_WEBHOOK_CHANNEL_TYPE, EVENT_WEBHOOK_TYPE, EVENT_WEBHOOK_VERSION } from "./constants";

export const listAllEventHooksFN = async (client: HttpClient) => {
  const { data } = await client.get<Webhook[]>("/eventHooks");
  return data;
};

export const deactivateEventHookFN = async (client: HttpClient, eventHookId: string) => {
  return await client.post(`/eventHooks/${eventHookId}/lifecycle/deactivate`);
};

export const deleteEventHookById = async (
  client: HttpClient,
  eventHookId: string,
): Promise<EventHookDeletion> => {
  await deactivateEventHookFN(client, eventHookId);
  await client.delete(`/eventHooks/${eventHookId}`);
  return { id: eventHookId, deleted: true };
};

export const deleteAllEventHooksFN = async (client: HttpClient, eventHookUrl?: string) => {
  const eventHooks = await listAllEventHooksFN(client);
  const deletedHooks: EventHookDeletion[] = [];

  await Promise.all(
    eventHooks.map(async (hook) => {
      if (!eventHookUrl || hook.channel.config.uri === eventHookUrl) {
        const deletedHook = await deleteEventHookById(client, hook.id);
        deletedHooks.push(deletedHook);
      }
    }),
  );

  return deletedHooks;
};

export const verifyEventHookFN = async (
  client: HttpClient,
  eventHookId: string,
): Promise<Webhook> => {
  const { data } = await client.post<Webhook>(`/eventHooks/${eventHookId}/lifecycle/verify`);
  return data;
};

export const createEventHookFN = async (
  client: HttpClient,
  {
    eventHookDescription,
    eventHookFilter,
    eventHookItemsCode,
    eventHookItems,
    eventHookUrlHeaders,
    eventHookName,
    eventHookUrl,
  }: CreateEventHookData,
) => {
  if (!eventHookItemsCode && eventHookItems.length === 0) {
    throw new Error("You must provide either Event Hook Items or Dynamic Event Hook Items.");
  }

  const items = eventHookItemsCode ? eventHookItemsCode : eventHookItems;

  const body = {
    name: eventHookName,
    events: {
      type: EVENT_WEBHOOK_TYPE,
      items,
      filter: eventHookFilter,
    },
    channel: {
      type: EVENT_WEBHOOK_CHANNEL_TYPE,
      config: {
        uri: eventHookUrl,
        headers: eventHookUrlHeaders,
      },
      version: EVENT_WEBHOOK_VERSION,
    },
    description: eventHookDescription,
  };
  const { data } = await client.post<Webhook>(`/eventHooks`, body);
  return data;
};

export const createEventHookTrigger = async (
  context: ActionContext,
  {
    connection,
    eventHookItems,
    eventHookItemsCode,
    eventHookUrlHeaders,
    eventHookFilter,
  }: CreateEventHookTriggerData,
) => {
  const client = await createClient(connection, true);
  const flowId = context.flow.id;
  const flowName = context.flow.name;
  const webhookUrl = context.webhookUrls[flowName];
  const eventHookName = `Okta Flow - ${context.flow.name}`;
  const eventHookDescription = `Event Hook for Okta Flow - ${context.flow.name}`;
  const { id } = await createEventHookFN(client, {
    eventHookName,
    eventHookDescription,
    eventHookUrl: webhookUrl,
    eventHookItems,
    eventHookItemsCode,
    eventHookUrlHeaders,
    eventHookFilter,
  });

  await verifyEventHookFN(client, id);
  context.logger.info(`Created event hook ${id} for flow ${context.flow.name} (${flowId})`);
};

export const deleteEventHookTrigger = async (
  context: ActionContext,
  { connection }: CreateEventHookTriggerData,
) => {
  const client = await createClient(connection, true);
  const flowId = context.flow.id;
  const flowName = context.flow.name;
  const webhookUrl = context.webhookUrls[flowName];
  const deletedEventHooks = await deleteAllEventHooksFN(client, webhookUrl);
  context.logger.info(
    `Deleted ${deletedEventHooks.length} event hooks associated with flow ${context.flow.name} (${flowId})`,
  );
};

export const eventHookPerformFN = async (
  _context: ActionContext,
  payload: TriggerPayload,
  _params: Record<string, unknown>,
) => {
  const headers = payload.headers || {};
  const verification = util.types.lowerCaseHeaders(headers)["x-okta-verification-challenge"];
  const response: HttpResponse = {
    statusCode: 200,
    contentType: "application/json",
    body: verification
      ? JSON.stringify({
          verification,
        })
      : "",
  };

  return Promise.resolve({
    payload,
    response,
    branch: verification ? "URL Validation" : "Notification",
  });
};
