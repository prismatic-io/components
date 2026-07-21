import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  projectId,
  subscription,
  subscriptionAdditionalFields,
  topic,
  topicNameOrFullFormat,
  webhookUrl,
} from "../../inputs";
export const createSubscription = action({
  display: {
    description: "Creates a subscription to a given topic.",
    label: "Create Subscription",
  },
  inputs: {
    connectionInput,
    projectId,
    subscription: {
      ...subscription,
      comments: "The name of the subscription to create.",
    },
    topic: {
      ...topic,
      comments:
        "The name of the topic from which this subscription is receiving messages. The value of this field will be _deleted-topic_ if the topic has been deleted.",
    },
    topicNameOrFullFormat,
    additionalFields: subscriptionAdditionalFields,
  },
  perform: async (
    _context,
    {
      connectionInput,
      projectId,
      topic,
      additionalFields,
      topicNameOrFullFormat,
      subscription,
    },
  ) => {
    const client = createClient(connectionInput);
    const topicName = topicNameOrFullFormat
      ? topic
      : `projects/${projectId}/topics/${topic}`;
    const { data } = await client.projects.subscriptions.create({
      name: `projects/${projectId}/subscriptions/${subscription}`,
      requestBody: {
        topic: topicName,
        pushConfig: additionalFields.pushConfig || undefined,
        bigqueryConfig: additionalFields.bigqueryConfig || undefined,
        ackDeadlineSeconds: additionalFields.ackDeadlineSeconds || undefined,
        retainAckedMessages: additionalFields.retainAckedMessages || undefined,
        messageRetentionDuration:
          additionalFields.messageRetentionDuration || undefined,
        labels: additionalFields.labels || undefined,
        enableMessageOrdering:
          additionalFields.enableMessageOrdering || undefined,
        expirationPolicy: additionalFields.expirationPolicy || undefined,
        filter: additionalFields.filter || undefined,
        deadLetterPolicy: additionalFields.deadLetterPolicy || undefined,
        retryPolicy: additionalFields.retryPolicy || undefined,
        detached: additionalFields.detached || undefined,
        enableExactlyOnceDelivery:
          additionalFields.enableExactlyOnceDelivery || undefined,
        topicMessageRetentionDuration:
          additionalFields.topicMessageRetentionDuration || undefined,
        state: additionalFields.state || undefined,
      },
    });
    return {
      data,
    };
  },
});
export const createWebhookSubscription = action({
  display: {
    label: "Create Webhook Subscription",
    description: "Creates a webhook subscription to a given topic.",
  },
  inputs: {
    connectionInput,
    projectId,
    subscription: {
      ...subscription,
      label: "Subscription Name",
      comments: "The name of the subscription to create.",
      example: "ASubscriptionName",
    },
    topic,
    topicNameOrFullFormat,
    webhookUrl,
  },
  perform: async ({ logger }, params) => {
    const client = createClient(params.connectionInput);
    const topicName = params.topicNameOrFullFormat
      ? params.topic
      : `projects/${params.projectId}/topics/${params.topic}`;
    const subscriptionName = `projects/${params.projectId}/subscriptions/${params.subscription}`;
    try {
      const { data } = await client.projects.subscriptions.create({
        name: subscriptionName,
        requestBody: {
          topic: topicName,
          pushConfig: {
            pushEndpoint: params.webhookUrl,
          },
        },
      });
      return { data: { ...data, alreadyExisted: false } };
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === 409
      ) {
        logger.warn(
          "Skipping creation of subscription because it already exists.",
        );
        const { data } = await client.projects.subscriptions.get({
          subscription: subscriptionName,
        });
        return { data: { ...data, alreadyExisted: true } };
      }
      throw error;
    }
  },
});
