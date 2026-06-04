import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getTaskExamplePayload } from "../../examplePayloads";
import { connectionInput, getCustomTaskIds, getSubTasks, getTaskId, getTeamId } from "../../inputs";
import type { GetTaskQueryParams } from "./types/GetTaskQueryParams";

const taskId = getTaskId(true, "Task ID");
const customTaskIds = getCustomTaskIds(false);
const teamId = getTeamId(true, "Only used when the custom_task_ids parameter is set to true.");
const subTasks = getSubTasks(false, "Include or exclude subtasks. By default, subtasks are excluded.");

export const getTask = action({
  display: {
    label: "Get Task",
    description: "Retrieve information about a task.",
  },
  examplePayload: getTaskExamplePayload,
  perform: async (context, { connection, taskId, customTaskIds, teamId, subTasks }) => {
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
  inputs: {
    connection: connectionInput,
    taskId,
    customTaskIds,
    teamId,
    subTasks,
  },
});
