import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { deleteTaskExamplePayload } from "../../examplePayloads";
import { connectionInput, getCustomTaskIds, getTaskId, getTeamId } from "../../inputs";
import type { DeleteTaskQueryParams } from "./types/DeleteTaskQueryParams";

const taskId = getTaskId(true, "Task ID");
const customTaskIds = getCustomTaskIds(false);
const teamId = getTeamId(false, "Only used when the custom_task_ids parameter is set to true.");

export const deleteTask = action({
  display: {
    label: "Delete Task",
    description: "Delete a task from a workspace.",
  },
  examplePayload: deleteTaskExamplePayload,
  perform: async (context, { connection, taskId, customTaskIds, teamId }) => {
    const client = createClickUpClient(connection, context.debug.enabled);
    const params: DeleteTaskQueryParams = {
      custom_task_ids: customTaskIds,
    };
    if (teamId.length) params.team_id = teamId;

    const { data } = await client.delete(`/task/${taskId}`, {
      params,
    });
    return {
      data: data,
    };
  },
  inputs: {
    connection: connectionInput,
    taskId,
    customTaskIds,
    teamId,
  },
});
