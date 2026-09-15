import type { WebhookSubscriptionPayload, Webhook } from "../types";
import { WEBHOOK_PAGE_SIZE, WEBHOOK_SUBSCRIPTIONS_URL } from "../constants";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
export const getUuidFromUri = (url: string): string =>
  url.replace(WEBHOOK_SUBSCRIPTIONS_URL, "");
export const postWebhookSubscription = async (
  client: HttpClient,
  url: string,
  events: string[],
  organization: string,
  user: string | undefined,
  scope: string,
  signingKey: string | undefined,
) => {
  const body = {
    url,
    events,
    organization,
    user: user,
    scope,
    signing_key: signingKey,
  };
  const { data } = await client.post("/webhook_subscriptions", body);
  return data;
};
export const getWebhookSubscriptions = async (
  client: HttpClient,
  organization: string,
  scope: string,
  count: string,
  pageToken: string | undefined,
  sort: string | undefined,
  user: string | undefined,
): Promise<WebhookSubscriptionPayload> => {
  const { data } = await client.get("/webhook_subscriptions", {
    params: {
      organization,
      scope,
      count,
      page_token: pageToken,
      sort,
      user,
    },
  });
  return data;
};
export const findWebhook = async (
  client: HttpClient,
  url: string,
  organization: string,
  user: string | undefined,
  scope: string,
): Promise<Webhook | undefined> => {
  let nextPageToken: string | undefined;
  let foundWebhook: Webhook | undefined;
  do {
    const data: WebhookSubscriptionPayload = await getWebhookSubscriptions(
      client,
      organization,
      scope,
      WEBHOOK_PAGE_SIZE,
      nextPageToken,
      undefined,
      user,
    );
    foundWebhook = data.collection.find(
      (webhook) => webhook.callback_url === url,
    );
    if (!foundWebhook) {
      nextPageToken = data.pagination.next_page_token ?? undefined;
    }
  } while (!foundWebhook && nextPageToken);
  return foundWebhook;
};
export const deleteWebhook = async (
  client: HttpClient,
  webhookUuid: string,
) => {
  const { data } = await client.delete(`/webhook_subscriptions/${webhookUuid}`);
  return data;
};
export const deleteWebhookInstance = async (
  client: HttpClient,
  endpoint: string,
  organization: string,
  user: string | undefined,
  scope: string,
) => {
  const foundWebhook = await findWebhook(
    client,
    endpoint,
    organization,
    user,
    scope,
  );
  if (foundWebhook)
    return await deleteWebhook(client, getUuidFromUri(foundWebhook.uri));
  throw new Error("Webhook not found");
};
