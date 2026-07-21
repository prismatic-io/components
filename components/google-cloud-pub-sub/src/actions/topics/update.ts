import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateTopicExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  projectId,
  topic,
  topicAdditionalFields,
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
    additionalFields: topicAdditionalFields,
  },
  perform: async (
    _context,
    {
      connectionInput,
      projectId,
      topic,
      topicNameOrFullFormat,
      updateMask,
      additionalFields,
    },
  ) => {
    const client = createClient(connectionInput);
    const name = topicNameOrFullFormat
      ? topic
      : `projects/${projectId}/topics/${topic}`;
    const { data } = await client.projects.topics.patch({
      name,
      requestBody: {
        updateMask: updateMask || undefined,
        topic: {
          labels: additionalFields.labels || undefined,
          messageStoragePolicy:
            additionalFields.messageStoragePolicy || undefined,
          kmsKeyName: additionalFields.kmsKeyName || undefined,
          schemaSettings: additionalFields.schemaSettings || undefined,
          satisfiesPzs: additionalFields.satisfiesPzs || undefined,
          messageRetentionDuration:
            additionalFields.messageRetentionDuration || undefined,
          name,
        },
      },
    });
    return {
      data,
    };
  },
});
