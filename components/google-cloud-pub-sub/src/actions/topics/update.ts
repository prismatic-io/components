import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateTopicExamplePayload } from "../../examplePayloads";
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
  topicNameOrFullFormat,
  updateMask,
} from "../../inputs";

export const updateTopic = action({
  display: {
    description: "Updates an existing topic.",
    label: "Update Topic",
  },
  examplePayload: updateTopicExamplePayload,
  inputs: {
    connectionInput,
    projectId,
    topic: { ...topic, comments: "Name of the topic" },
    topicNameOrFullFormat,
    updateMask,
    labels,
    messageStoragePolicy,
    kmsKeyName,
    schemaSettings,
    satisfiesPzs,
    messageRetentionDuration,
  },
  perform: async (
    _context,
    {
      connectionInput,
      projectId,
      topic,
      topicNameOrFullFormat,
      updateMask,
      labels,
      messageStoragePolicy,
      kmsKeyName,
      schemaSettings,
      satisfiesPzs,
      messageRetentionDuration,
    },
  ) => {
    const client = createClient(connectionInput);
    const name = topicNameOrFullFormat ? topic : `projects/${projectId}/topics/${topic}`;
    const { data } = await client.projects.topics.patch({
      name,
      requestBody: {
        updateMask: updateMask || undefined,
        topic: {
          labels: labels || undefined,
          messageStoragePolicy: messageStoragePolicy || undefined,
          kmsKeyName: kmsKeyName || undefined,
          schemaSettings: schemaSettings || undefined,
          satisfiesPzs: satisfiesPzs || undefined,
          messageRetentionDuration: messageRetentionDuration || undefined,
          name,
        },
      },
    });
    return {
      data,
    };
  },
});
