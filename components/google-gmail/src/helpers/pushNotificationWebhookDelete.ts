import { createPubSubClient } from "../client";
import type {
  PushNotificationWebhookDeleteContext,
  PushNotificationWebhookDeleteParams,
} from "../types";
import { generatePrefixedHash, getBase64FromUrl } from "../utils";

export const pushNotificationWebhookDelete = async (
  { logger, webhookUrls, flow }: PushNotificationWebhookDeleteContext,
  { connection, projectId, topicId, subscriptionId }: PushNotificationWebhookDeleteParams,
) => {
  const pubSubClient = await createPubSubClient(connection);

  const integrationFlowName = flow.name;
  const encodedId = getBase64FromUrl(webhookUrls[integrationFlowName]);
  const prefixedTopicId = generatePrefixedHash(topicId, encodedId);
  const prefixedSubscriptionId = generatePrefixedHash(subscriptionId, encodedId);

  const subscriptionName = `projects/${projectId}/subscriptions/${prefixedSubscriptionId}`;
  try {
    await pubSubClient.projects.subscriptions.delete({
      subscription: subscriptionName,
    });
    logger.info(`Deleted subscription: ${subscriptionName}`);
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === 404) {
      logger.warn(`Subscription ${subscriptionName} was already deleted or does not exist`);
    } else {
      logger.error(`Failed to delete subscription: ${error}`);
    }
  }

  const topicName = `projects/${projectId}/topics/${prefixedTopicId}`;
  try {
    await pubSubClient.projects.topics.delete({
      topic: topicName,
    });
    logger.info(`Deleted topic: ${topicName}`);
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === 404) {
      logger.warn(`Topic ${topicName} was already deleted or does not exist`);
    } else {
      logger.error(`Failed to delete topic: ${error}`);
      throw error;
    }
  }
};
