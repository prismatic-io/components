import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createTopicExamplePayload, setPolicyExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  kmsKeyName,
  labels,
  messageRetentionDuration,
  messageStoragePolicy,
  projectId,
  satisfiesPzs,
  schemaSettings,
  topic,
} from "../../inputs";

export const createTopic = action({
  display: {
    description: "Creates the given topic with the given name.",
    label: "Create Topic",
  },
  inputs: {
    connectionInput,
    projectId,
    topic: { ...topic, comments: "Name of the new topic" },
    labels,
    messageStoragePolicy,
    kmsKeyName,
    schemaSettings,
    satisfiesPzs,
    messageRetentionDuration,
  },
  perform: async (
    { logger },
    {
      connectionInput,
      projectId,
      topic,
      labels,
      messageStoragePolicy,
      kmsKeyName,
      schemaSettings,
      satisfiesPzs,
      messageRetentionDuration,
    },
  ) => {
    const client = createClient(connectionInput);
    try {
      const { data } = await client.projects.topics.create({
        name: `projects/${projectId}/topics/${topic}`,
        requestBody: {
          labels: labels || undefined,
          messageStoragePolicy: messageStoragePolicy || undefined,
          kmsKeyName: kmsKeyName || undefined,
          schemaSettings: schemaSettings || undefined,
          satisfiesPzs: satisfiesPzs || undefined,
          messageRetentionDuration: messageRetentionDuration || undefined,
        },
      });
      return { data: { ...data, alreadyExisted: false } };
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "code" in error && error.code === 409) {
        logger.warn("Skipping creation of topic because it already exists.");
        return {
          data: {
            name: `projects/${projectId}/topics/${topic}`,
            alreadyExisted: true,
          },
        };
      }
      throw error;
    }
  },
  examplePayload: createTopicExamplePayload,
});

export const setTopicIamPolicy = action({
  display: {
    label: "Set Gmail IAM Policy for Topic",
    description: "Configure a topic to allow publish notifications from Gmail.",
  },
  inputs: {
    connectionInput,
    topic: {
      ...topic,
      comments: "The full name of the topic to set the IAM policy for",
      example: "/topics/PROJECT-NAME/topics/TOPIC-NAME",
    },
  },
  perform: async (_context, { connectionInput, topic }) => {
    const client = createClient(connectionInput);

    const { data } = await client.projects.topics.setIamPolicy({
      resource: topic,
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
    return { data };
  },
  examplePayload: {
    data: setPolicyExamplePayload.data,
  },
});
