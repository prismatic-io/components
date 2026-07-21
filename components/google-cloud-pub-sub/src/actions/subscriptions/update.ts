import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  projectId,
  subscription,
  subscriptionAdditionalFields,
  subscriptionNameOrFullFormat,
  topic,
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
    additionalFields: subscriptionAdditionalFields,
  },
  perform: async (
    _context,
    {
      connectionInput,
      projectId,
      topic,
      updateMask,
      additionalFields,
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
          pushConfig: additionalFields.pushConfig || undefined,
          bigqueryConfig: additionalFields.bigqueryConfig || undefined,
          ackDeadlineSeconds: additionalFields.ackDeadlineSeconds || undefined,
          retainAckedMessages:
            additionalFields.retainAckedMessages || undefined,
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
      },
    });
    return {
      data,
    };
  },
});
