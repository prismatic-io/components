import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  ackDeadlineSeconds,
  bigqueryConfig,
  connectionInput,
  deadLetterPolicy,
  detached,
  enableExactlyOnceDelivery,
  enableMessageOrdering,
  expirationPolicy,
  filter,
  labels,
  messageRetentionDuration,
  projectId,
  pushConfig,
  retainAckedMessages,
  retryPolicy,
  state,
  subscription,
  topic,
  topicMessageRetentionDuration,
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
    pushConfig,
    bigqueryConfig,
    ackDeadlineSeconds,
    retainAckedMessages,
    messageRetentionDuration,
    labels,
    enableMessageOrdering,
    expirationPolicy,
    filter,
    deadLetterPolicy,
    retryPolicy,
    detached,
    enableExactlyOnceDelivery,
    topicMessageRetentionDuration,
    state,
  },
  perform: async (
    _context,
    {
      connectionInput,
      projectId,
      topic,
      pushConfig,
      bigqueryConfig,
      ackDeadlineSeconds,
      retainAckedMessages,
      messageRetentionDuration,
      labels,
      enableMessageOrdering,
      expirationPolicy,
      filter,
      deadLetterPolicy,
      retryPolicy,
      detached,
      enableExactlyOnceDelivery,
      topicMessageRetentionDuration,
      state,
      topicNameOrFullFormat,
      subscription,
    },
  ) => {
    const client = createClient(connectionInput);
    const topicName = topicNameOrFullFormat ? topic : `projects/${projectId}/topics/${topic}`;
    const { data } = await client.projects.subscriptions.create({
      name: `projects/${projectId}/subscriptions/${subscription}`,
      requestBody: {
        topic: topicName,
        pushConfig: pushConfig || undefined,
        bigqueryConfig: bigqueryConfig || undefined,
        ackDeadlineSeconds: ackDeadlineSeconds || undefined,
        retainAckedMessages: retainAckedMessages || undefined,
        messageRetentionDuration: messageRetentionDuration || undefined,
        labels: labels || undefined,
        enableMessageOrdering: enableMessageOrdering || undefined,
        expirationPolicy: expirationPolicy || undefined,
        filter: filter || undefined,
        deadLetterPolicy: deadLetterPolicy || undefined,
        retryPolicy: retryPolicy || undefined,
        detached: detached || undefined,
        enableExactlyOnceDelivery: enableExactlyOnceDelivery || undefined,
        topicMessageRetentionDuration: topicMessageRetentionDuration || undefined,
        state: state || undefined,
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
      if (typeof error === "object" && error !== null && "code" in error && error.code === 409) {
        logger.warn("Skipping creation of subscription because it already exists.");
        const { data } = await client.projects.subscriptions.get({
          subscription: subscriptionName,
        });
        return { data: { ...data, alreadyExisted: true } };
      }
      throw error;
    }
  },
});
