import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getTaskExamplePayload } from "../../examplePayloads";
import { getTaskInputs } from "../../inputs";
import { getTaskOutputSchema } from "../../outputSchemas";
import type { GetTaskQueryParams } from "../../types";
export const getTask = action({
  display: {
    label: "Get Task",
    description: "Retrieve information about a task.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getTaskOutputSchema,
  }),
  examplePayload: getTaskExamplePayload,
  performSafety: "safe",
  perform: async (
    context,
    { connection, taskId, customTaskIds, teamId, subTasks },
  ) => {
    const client = createClickUpClient(connection, context.debug.enabled);
    const params: GetTaskQueryParams = {
      custom_task_ids: customTaskIds,
      include_subtasks: subTasks,
    };
    if (teamId.length) params.team_id = teamId;
    const { data } = await client.get(`/task/${taskId}`, {
      params,
    });
    return {
      data: data,
    };
  },
  inputs: getTaskInputs,
});
