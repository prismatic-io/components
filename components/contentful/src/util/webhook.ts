import type { ClientAPI, Space, WebHooks } from "contentful-management";
import type { EventsWebhookFlowState } from "../types";
export const getEventsWebhookStateKey = (flowName: string): string =>
  `contentfulEventsWebhook:${flowName}`;
export const findWebhooksByUrl = async (
  space: Space,
  webhookUrl: string,
): Promise<WebHooks[]> => {
  const webhooks = await space.getWebhooks();
  return webhooks.items.filter((item) => item.url === webhookUrl);
};
export const deleteWebhooksByUrl = async (
  space: Space,
  webhookUrl: string,
): Promise<number> => {
  const webhooks = await findWebhooksByUrl(space, webhookUrl);
  for (const webhook of webhooks) {
    await webhook.delete();
  }
  return webhooks.length;
};
const removeWebhooksFromPreviousSpace = async (
  client: ClientAPI,
  previousSpaceId: string,
  webhookUrl: string,
  log: (message: string) => void,
): Promise<number> => {
  try {
    const previousSpace = await client.getSpace(previousSpaceId);
    const removed = await deleteWebhooksByUrl(previousSpace, webhookUrl);
    log(
      `Removed ${removed} webhook(s) for this flow from previously configured space ${previousSpaceId}.`,
    );
    return removed;
  } catch (error) {
    log(
      `Could not remove webhooks from previously configured space ${previousSpaceId}: ${error instanceof Error ? error.message : String(error)}`,
    );
    return 0;
  }
};
const haveSameTopics = (current: string[], desired: string[]): boolean =>
  current.length === desired.length &&
  [...current].sort().join("\n") === [...desired].sort().join("\n");
export const upsertEventsWebhook = async (
  client: ClientAPI,
  {
    spaceId,
    webhookUrl,
    webhookName,
    topics,
    previousState,
    log,
  }: {
    spaceId: string;
    webhookUrl: string;
    webhookName: string;
    topics: string[];
    previousState: EventsWebhookFlowState | undefined;
    log: (message: string) => void;
  },
): Promise<EventsWebhookFlowState> => {
  if (previousState?.spaceId && previousState.spaceId !== spaceId) {
    await removeWebhooksFromPreviousSpace(
      client,
      previousState.spaceId,
      webhookUrl,
      log,
    );
  }
  const space = await client.getSpace(spaceId);
  const [existing, ...duplicates] = await findWebhooksByUrl(space, webhookUrl);
  for (const duplicate of duplicates) {
    await duplicate.delete();
  }
  if (duplicates.length > 0) {
    log(`Removed ${duplicates.length} duplicate webhook(s) for this flow.`);
  }
  if (!existing) {
    const created = await space.createWebhook({
      url: webhookUrl,
      name: webhookName,
      topics,
    });
    log(`Created webhook ${created.sys.id}.`);
    return { webhookId: created.sys.id, spaceId };
  }
  if (haveSameTopics(existing.topics ?? [], topics)) {
    log(`Webhook ${existing.sys.id} already exists with the same topics.`);
    return { webhookId: existing.sys.id, spaceId };
  }
  existing.topics = topics;
  const updated = await existing.update();
  log(`Updated topics on webhook ${updated.sys.id}.`);
  return { webhookId: updated.sys.id, spaceId };
};
export const removeEventsWebhooks = async (
  client: ClientAPI,
  {
    spaceId,
    webhookUrl,
    previousState,
    log,
  }: {
    spaceId: string;
    webhookUrl: string;
    previousState: EventsWebhookFlowState | undefined;
    log: (message: string) => void;
  },
): Promise<number> => {
  const space = await client.getSpace(spaceId);
  let removed = await deleteWebhooksByUrl(space, webhookUrl);
  if (previousState?.spaceId && previousState.spaceId !== spaceId) {
    removed += await removeWebhooksFromPreviousSpace(
      client,
      previousState.spaceId,
      webhookUrl,
      log,
    );
  }
  return removed;
};
