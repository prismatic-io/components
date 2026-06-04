import type { Connection } from "@prismatic-io/spectral";
import { createClient } from "../client";
import type { MailchimpWebhook, WebhookEvents, WebhookSources } from "../types";

export const listWebhooks = async (
  connection: Connection,
  listId: string,
): Promise<MailchimpWebhook[]> => {
  const client = await createClient(connection);
  const { data } = await client.get<{ webhooks: MailchimpWebhook[] }>(
    `/lists/${listId}/webhooks`,
  );
  return data.webhooks || [];
};

export const findWebhookByUrl = async (
  connection: Connection,
  listId: string,
  endpoint: string,
): Promise<MailchimpWebhook | undefined> => {
  const webhooks = await listWebhooks(connection, listId);
  return webhooks.find((webhook) => webhook.url === endpoint);
};

export const createWebhook = async (
  connection: Connection,
  listId: string,
  endpoint: string,
  events: WebhookEvents,
  sources: WebhookSources = { user: true, admin: true, api: true },
): Promise<MailchimpWebhook> => {
  const client = await createClient(connection);

  const existingWebhook = await findWebhookByUrl(connection, listId, endpoint);

  if (existingWebhook) {
    return existingWebhook;
  }

  const { data } = await client.post<MailchimpWebhook>(
    `/lists/${listId}/webhooks`,
    {
      url: endpoint,
      events,
      sources,
    },
  );

  return data;
};

export const getWebhook = async (
  connection: Connection,
  listId: string,
  webhookId: string,
): Promise<MailchimpWebhook> => {
  const client = await createClient(connection);
  const { data } = await client.get<MailchimpWebhook>(
    `/lists/${listId}/webhooks/${webhookId}`,
  );
  return data;
};

export const updateWebhook = async (
  connection: Connection,
  listId: string,
  webhookId: string,
  endpoint: string,
  events: WebhookEvents,
  sources: WebhookSources = { user: true, admin: true, api: true },
): Promise<MailchimpWebhook> => {
  const client = await createClient(connection);
  const { data } = await client.patch<MailchimpWebhook>(
    `/lists/${listId}/webhooks/${webhookId}`,
    {
      url: endpoint,
      events,
      sources,
    },
  );
  return data;
};

export const deleteWebhook = async (
  connection: Connection,
  listId: string,
  webhookId: string,
): Promise<void> => {
  const client = await createClient(connection);
  await client.delete(`/lists/${listId}/webhooks/${webhookId}`);
};

export const deleteWebhookByUrl = async (
  connection: Connection,
  listId: string,
  endpoint: string,
): Promise<void> => {
  const existingWebhook = await findWebhookByUrl(connection, listId, endpoint);

  if (!existingWebhook) {
    return;
  }

  await deleteWebhook(connection, listId, existingWebhook.id);
};

export const toWebhookEvents = (values: unknown): WebhookEvents => {
  const events = (values || []) as string[];
  return {
    subscribe: events.includes("subscribe"),
    unsubscribe: events.includes("unsubscribe"),
    profile: events.includes("profile"),
    cleaned: events.includes("cleaned"),
    upemail: events.includes("upemail"),
    campaign: events.includes("campaign"),
  } as WebhookEvents;
};

export const toWebhookSources = (values: unknown): WebhookSources => {
  const sources = (values || []) as string[];
  return {
    user: sources.includes("user"),
    admin: sources.includes("admin"),
    api: sources.includes("api"),
  } as WebhookSources;
};
