import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteTopicExamplePayload } from "../../examplePayloads";
import { connectionInput, projectId, topic, topicNameOrFullFormat } from "../../inputs";

export const deleteTopic = action({
  display: {
    label: "Delete Topic",
    description: "Deletes the topic with the given name.",
  },
  examplePayload: deleteTopicExamplePayload,
  inputs: {
    connectionInput,
    projectId,
    topic,
    topicNameOrFullFormat,
  },
  perform: async (_context, { connectionInput, projectId, topic, topicNameOrFullFormat }) => {
    const client = createClient(connectionInput);
    const topicName = topicNameOrFullFormat ? topic : `projects/${projectId}/topics/${topic}`;
    const { data } = await client.projects.topics.delete({
      topic: topicName,
    });
    return {
      data,
    };
  },
});
