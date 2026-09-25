import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { createTopicExamplePayload } from "../../examplePayloads";
import { createTopicInputs } from "../../inputs";
import { createTopicOutputSchema } from "../../outputSchemas";
import type { Topic } from "../../types";
export const createTopic = action({
  display: {
    label: "Create Topic",
    description: "Create a new topic in the Help Center.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { zendeskConnection, topicName, topicDescription },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const payload = {
      topic: {
        name: topicName,
        description: topicDescription,
      },
    };
    const { data } = await client.post<{
      topic: Topic;
    }>("/community/topics", payload);
    return {
      data,
    };
  },
  examplePerform: async (_context, { topicDescription, topicName }) => ({
    data: {
      ...createTopicExamplePayload.data,
      topic: {
        ...createTopicExamplePayload.data.topic,
        ...(topicName ? { name: topicName } : {}),
        ...(topicDescription ? { description: topicDescription } : {}),
      },
    },
  }),
  inputs: createTopicInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createTopicOutputSchema,
  }),
  examplePayload: createTopicExamplePayload,
});
