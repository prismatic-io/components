import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getTaskCommentsExamplePayload } from "../../examplePayloads";
import { getTaskCommentsInputs } from "../../inputs";
import { getTaskCommentsOutputSchema } from "../../outputSchemas";
import type { GetTaskCommentsQueryParams } from "../../types";
export const getTaskComments = action({
  display: {
    label: "Get Task Comments",
    description: "List all comments on a task.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getTaskCommentsOutputSchema,
  }),
  examplePayload: getTaskCommentsExamplePayload,
  performSafety: "safe",
  perform: async (
    context,
    { connection, taskId, customTaskIds, teamId, pagination },
  ) => {
    const client = createClickUpClient(connection, context.debug.enabled);
    const params: GetTaskCommentsQueryParams = {
      custom_task_ids: customTaskIds,
      team_id: teamId,
      start: pagination?.startDate,
      start_id: pagination?.startId,
    };
    const { data } = await client.get(`/task/${taskId}/comment`, {
      params,
    });
    return {
      data: data,
    };
  },
  inputs: getTaskCommentsInputs,
});
