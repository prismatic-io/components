import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getTaskMembersExamplePayload } from "../../examplePayloads";
import { getTaskMembersInputs } from "../../inputs";
import { getTaskMembersOutputSchema } from "../../outputSchemas";
export const getTaskMembers = action({
  display: {
    label: "Get Task Members",
    description: "List the members assigned to a task.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getTaskMembersOutputSchema,
  }),
  examplePayload: getTaskMembersExamplePayload,
  performSafety: "safe",
  perform: async (context, { clickUpConnection, taskId }) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/task/${taskId}/member`);
    return {
      data,
    };
  },
  inputs: getTaskMembersInputs,
});
