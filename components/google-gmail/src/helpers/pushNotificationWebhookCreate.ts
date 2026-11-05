import { createPubSubClient, createClient as createGmailClient } from "../client";
import type {
  PushNotificationWebhookCreateContext,
  PushNotificationWebhookCreateParams,
} from "../types";
import { generatePrefixedHash, getBase64FromUrl } from "../utils";
import { createWatchFn } from "../watchUtils";

export const pushNotificationWebhookCreate = async (
  { logger, webhookUrls, flow, crossFlowState }: PushNotificationWebhookCreateContext,
  {
    connection,
    projectId,
    topicId,
    subscriptionId,
    userId,
    labelIds,
  }: PushNotificationWebhookCreateParams,
) => {
  const idRegex = /^(?!goog)[A-Za-z][A-Za-z0-9\-._~%+]{2,14}$/i;
  const idError =
    "must be between 3 and 15 characters long, start with a letter, and contain only the following characters: letters, numbers, dashes (-), periods (.), underscores (_), tildes (~), percents (%) or plus signs (+). Cannot start with 'goog'.";
  if (!idRegex.test(topicId)) {
    const errorMessage = `Topic ID ${idError}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  if (!idRegex.test(subscriptionId)) {
    const errorMessage = `Subscription ID ${idError}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  const pubSubClient = await createPubSubClient(connection);
  const gmailClient = await createGmailClient(connection);

  const integrationFlowName = flow.name;
  const encodedId = getBase64FromUrl(webhookUrls[integrationFlowName]);

  const prefixedTopicId = generatePrefixedHash(topicId, encodedId);
  const topicName = `projects/${projectId}/topics/${prefixedTopicId}`;
  try {
    const { data: topicData } = await pubSubClient.projects.topics.create({
      name: topicName,
    });

    logger.info(`Created topic: ${topicData.name}`);

    await pubSubClient.projects.topics.setIamPolicy({
      resource: topicName,
      requestBody: {
        policy: {
          bindings: [
            {
              role: "roles/pubsub.publisher",
              members: ["serviceAccount:gmail-api-push@system.gserviceaccount.com"],
            },
          ],
        },
      },
    });
    logger.info(`Set IAM policy for topic: ${topicName}`);
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === 409) {
      logger.warn(`Skipping creation of topic because ${topicName} already exists.`);
    } else {
      logger.error(error);
      throw error;
    }
  }

  const prefixedSubscriptionId = generatePrefixedHash(subscriptionId, encodedId);
  const pushEndpoint = webhookUrls[integrationFlowName];
  try {
    const { data: subscriptionData } = await pubSubClient.projects.subscriptions.create({
      name: `projects/${projectId}/subscriptions/${prefixedSubscriptionId}`,
      requestBody: {
        topic: topicName,
        pushConfig: {
          pushEndpoint,
        },
      },
    });
    logger.info(`Created subscription: ${subscriptionData.name}`);
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === 409) {
      logger.warn(
        `Skipping creation of subscription because ${prefixedSubscriptionId} already exists.`,
      );
    } else {
      logger.error(error);
      throw error;
    }
  }

  try {
    const watchData = await createWatchFn(gmailClient, userId, topicName, labelIds || []);
    logger.info(
      `Created Gmail watch for user ${userId}. ` +
        `HistoryId: ${watchData.historyId}, ` +
        `Expiration: ${watchData.expiration}`,
    );

    crossFlowState[encodedId] = {
      historyId: watchData.historyId,
    };
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
