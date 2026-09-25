import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { deleteTopicExamplePayload } from "../../examplePayloads";
import { deleteTopicInputs } from "../../inputs";
import { deleteTopicOutputSchema } from "../../outputSchemas";
export const deleteTopic = action({
  display: {
    label: "Delete Topic",
    description: "Delete a topic from the Help Center.",
  },
  performSafety: "notAllowed",
  perform: async (context, { zendeskConnection, topicId }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.delete(`/community/topics/${topicId}`);
    return { data };
  },
  examplePerform: async () => deleteTopicExamplePayload,
  inputs: deleteTopicInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteTopicOutputSchema,
  }),
  examplePayload: deleteTopicExamplePayload,
});
