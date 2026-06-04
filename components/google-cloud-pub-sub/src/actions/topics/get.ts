import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, projectId, topic, topicNameOrFullFormat } from "../../inputs";

export const getTopic = action({
  display: {
    label: "Get Topic",
    description: "Gets the configuration of a topic.",
  },
  inputs: {
    connectionInput,
    projectId,
    topic,
    topicNameOrFullFormat,
  },
  perform: async (_context, { connectionInput, projectId, topic, topicNameOrFullFormat }) => {
    const client = createClient(connectionInput);
    const topicName = topicNameOrFullFormat ? topic : `projects/${projectId}/topics/${topic}`;
    const { data } = await client.projects.topics.get({
      topic: topicName,
    });
    return {
      data,
    };
  },
});
