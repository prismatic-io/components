import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { deleteTaskExamplePayload } from "../../examplePayloads";
import { deleteTaskInputs } from "../../inputs";
import type { DeleteTaskQueryParams } from "../../types";
export const deleteTask = action({
  display: {
    label: "Delete Task",
    description: "Delete a task from a workspace.",
  },
  examplePayload: deleteTaskExamplePayload,
  performSafety: "notAllowed",
  perform: async (context, { connection, taskId, customTaskIds, teamId }) => {
    const client = createClickUpClient(connection, context.debug.enabled);
    const params: DeleteTaskQueryParams = {
      custom_task_ids: customTaskIds,
    };
    if (teamId?.length) params.team_id = teamId;
    const { data } = await client.delete(`/task/${taskId}`, {
      params,
    });
    return {
      data: data,
    };
  },
  examplePerform: async () => deleteTaskExamplePayload,
  inputs: deleteTaskInputs,
});
