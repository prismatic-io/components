import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { ActionContext, Connection } from "@prismatic-io/spectral";
import { ConnectionError } from "@prismatic-io/spectral";
import type { CreateWebhookParams, Webhook, WebhookParams } from "../types";
import connections from "../connections";
import { createClient } from "../client";
export const createWebhook = async (
  client: HttpClient,
  params: CreateWebhookParams,
) => {
  return await client.post("/webhooks", {
    subscription_url: params.subscriptionUrl,
    event_action: params.eventAction,
    event_object: params.eventObject,
    user_id: params.userId,
    http_auth_user: params.httpAuthUser,
    http_auth_password: params.httpAuthPassword,
    version: params.version || "2.0",
  });
};
export const deleteWebhook = async (client: HttpClient, webhookId: string) => {
  return await client.delete(`/webhooks/${webhookId}`);
};
export const listWebhooks = async (client: HttpClient) => {
  const { data } = await client.get("/webhooks");
  return data;
};
export const validateConnection = (connection: Connection) => {
  const connectionsMap = connections.map(({ key }) => key);
  if (!connectionsMap.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Connection key is not valid: ${connection.key}`,
    );
  }
};
const getWebhookClient = (connection: Connection) => {
  return createClient(connection, false);
};
const getWebhookEndpoint = (context: ActionContext) => {
  return context.webhookUrls[context.flow.name];
};
export const onInstanceDeploy = async (
  context: ActionContext,
  params: WebhookParams,
) => {
  const endpoint = getWebhookEndpoint(context);
  const {
    connection,
    version,
    eventAction,
    eventObject,
    userId,
    httpAuthUser,
    httpAuthPassword,
  } = params;
  const client = getWebhookClient(connection as Connection);
  const { data } = await createWebhook(client, {
    subscriptionUrl: endpoint,
    eventAction: eventAction as string,
    eventObject: eventObject as string,
    userId: userId as number,
    httpAuthUser: httpAuthUser as string,
    httpAuthPassword: httpAuthPassword as string,
    version: version as string,
  });
  return data;
};
export const onInstanceDelete = async (
  context: ActionContext,
  params: WebhookParams,
) => {
  const { connection } = params;
  const endpoint = getWebhookEndpoint(context);
  const client = getWebhookClient(connection as Connection);
  const { data } = await listWebhooks(client);
  const webhookIds = data
    .filter((webhook: Webhook) => webhook.subscription_url === endpoint)
    .map((webhook: Webhook) => webhook.id);
  const webhookDeletions = await Promise.all(
    webhookIds.map((webhookId: string) => deleteWebhook(client, webhookId)),
  );
  return webhookDeletions;
};
