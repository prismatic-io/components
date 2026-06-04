import { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { ListWebhoks, TableauTriggerPayload, Webhook } from "./interfaces";

export const deleteWebhooksInstance = async (
  client: HttpClient,
  endpoint: string,
) => {
  const foundWebhooks = await findWebhooks(client, endpoint);

  if (foundWebhooks && foundWebhooks.length > 0)
    return await deleteWebhooks(client, foundWebhooks);

  throw new Error("Webhooks not found");
};

export const createWebhookSubscriptions = async (
  client: HttpClient,
  endpoint: string,
  events: string[],
) => {
  const eventsToSubscribe = [];
  for (const event of events) {
    eventsToSubscribe.push(
      createWebhookSubscription(client, endpoint, event, undefined),
    );
  }
  return await Promise.allSettled(eventsToSubscribe);
};

export const createWebhookSubscription = async (
  client: HttpClient,
  endpoint: string,
  event: string,
  name: string,
  isEnabled = true,
) => {
  const webhookName = name
    ? name
    : `Prism - ${new Date().toLocaleDateString("en-US")} - ${event}`;
  return await client.post(`/webhooks`, {
    webhook: {
      name: webhookName,
      "webhook-destination": {
        "webhook-destination-http": {
          url: endpoint,
          method: "POST",
        },
      },
      isEnabled,
      event,
    },
  });
};

export const findWebhooks = async (client: HttpClient, endpoint: string) => {
  const { data } = await client.get<ListWebhoks>("/webhooks");
  return data.webhooks.webhook.filter(
    (webhook: Webhook) =>
      webhook["webhook-destination"]["webhook-destination-http"].url ===
      endpoint,
  );
};

export const deleteWebhooks = async (
  client: HttpClient,
  webhooks: Webhook[],
) => {
  const webhooksToDelete = [];
  for (const webhook of webhooks) {
    webhooksToDelete.push(deleteWebhook(client, webhook.id));
  }
  return await Promise.allSettled(webhooksToDelete);
};

export const deleteWebhook = async (client: HttpClient, webhookId: string) => {
  return await client.delete(`/webhooks/${webhookId}`);
};

export const getEventInfo = async (
  client: HttpClient,
  event: TableauTriggerPayload,
) => {
  if (event.event_type.includes("Deleted")) {
    return event;
  }

  const eventResourceId = event.resource_luid;

  const { data } = await client.get(`/workbooks/${eventResourceId}`);

  return {
    ...event,
    resourceInfo: data,
  };
};
