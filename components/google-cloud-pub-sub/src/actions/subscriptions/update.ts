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
  subscriptionNameOrFullFormat,
  topic,
  topicMessageRetentionDuration,
  updateMask,
} from "../../inputs";

export const updateSubscription = action({
  display: {
    description: "Updates an existing subscription.",
    label: "Update Subscription",
  },
  inputs: {
    connectionInput,
    projectId,
    subscription,
    topic: {
      ...topic,
      comments:
        "The name of the topic from which this subscription is receiving messages. The value of this field will be _deleted-topic_ if the topic has been deleted.",
    },
    subscriptionNameOrFullFormat,
    updateMask,
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
      updateMask,
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
      subscriptionNameOrFullFormat,
      subscription,
    },
  ) => {
    const client = createClient(connectionInput);
    const subscriptionName = subscriptionNameOrFullFormat
      ? subscription
      : `projects/${projectId}/subscriptions/${subscription}`;
    const { data } = await client.projects.subscriptions.patch({
      name: subscriptionName,
      requestBody: {
        updateMask,
        subscription: {
          topic: `projects/${projectId}/topics/${topic}`,
          name: subscriptionName,
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
      },
    });
    return {
      data,
    };
  },
});
