import type { ActionLogger, Connection, FlowAttributes } from "@prismatic-io/spectral";

export type PushNotificationWebhookDeleteContext = {
  logger: ActionLogger;
  webhookUrls: Record<string, string>;
  flow: FlowAttributes;
};

export type PushNotificationWebhookDeleteParams = {
  connection: Connection;
  projectId: string;
  topicId: string;
  subscriptionId: string;
};
