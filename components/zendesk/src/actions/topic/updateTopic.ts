import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { updateTopicExamplePayload } from "../../examplePayloads";
import { updateTopicInputs } from "../../inputs";
import { updateTopicOutputSchema } from "../../outputSchemas";
import type { Topic } from "../../types";
export const updateTopic = action({
  display: {
    label: "Update Topic",
    description: "Update a topic in the Help Center.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      zendeskConnection,
      topicId,
      topicDescription,
      manageableBy,
      position,
      userSegmentId,
      topicName,
    },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const payload = {
      topic: {
        manageable_by: manageableBy,
        description: topicDescription,
        position: position,
        name: topicName,
        user_segment_id: userSegmentId,
      },
    };
    const { data } = await client.put<{
      topic: Topic;
    }>(`/community/topics/${topicId}`, payload);
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    { topicDescription, topicId, topicName },
  ) => ({
    data: {
      ...updateTopicExamplePayload.data,
      topic: {
        ...updateTopicExamplePayload.data.topic,
        ...(topicId ? { id: topicId } : {}),
        ...(topicName ? { name: topicName } : {}),
        ...(topicDescription ? { description: topicDescription } : {}),
      },
    },
  }),
  inputs: updateTopicInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateTopicOutputSchema,
  }),
  examplePayload: updateTopicExamplePayload,
});
