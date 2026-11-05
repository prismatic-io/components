import type { ActionLogger, Connection, FlowAttributes } from "@prismatic-io/spectral";

export type PushNotificationWebhookCreateContext = {
  crossFlowState: Record<string, unknown>;
  logger: ActionLogger;
  webhookUrls: Record<string, string>;
  flow: FlowAttributes;
};

export type PushNotificationWebhookCreateParams = {
  connection: Connection;
  projectId: string;
  topicId: string;
  subscriptionId: string;
  userId: string;
  labelIds: string[];
};
