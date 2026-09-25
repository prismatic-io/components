import { action, outputSchema } from "@prismatic-io/spectral";
import { getTopicInputs } from "../../inputs";
import { rawHttpClient } from "../../auth";
import { getTopicOutputSchema } from "../../outputSchemas";
import type { Topic } from "../../types";
import { getTopicExamplePayload } from "../../examplePayloads";
export const getTopic = action({
  display: {
    label: "Get Topic",
    description: "Get a topic from the Help Center.",
  },
  performSafety: "safe",
  perform: async (context, { zendeskConnection, topicId }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.get<{
      topic: Topic;
    }>(`/community/topics/${topicId}`);
    return {
      data,
    };
  },
  inputs: getTopicInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getTopicOutputSchema,
  }),
  examplePayload: getTopicExamplePayload,
});
