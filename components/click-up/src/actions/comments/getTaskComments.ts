import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getTaskCommentsExamplePayload } from "../../examplePayloads";
import { connectionInput, getCustomTaskIds, getStartId, getTaskId, getTeamId, startDate } from "../../inputs";
import type { GetTaskCommentsQueryParams } from "./types/GetTaskCommentsQueryParams";

const taskId = getTaskId(true, "Task ID");
const customTaskIds = getCustomTaskIds(false);
const teamId = getTeamId(false, "Only used when the custom_task_ids parameter is set to true.");
const startId = getStartId(false, "Enter the Comment id of a task comment.");

export const getTaskComments = action({
  display: {
    label: "Get Task Comments",
    description: "List all comments on a task.",
  },
  examplePayload: getTaskCommentsExamplePayload,
  perform: async (context, { connection, taskId, customTaskIds, teamId, startId, startDate }) => {
    const client = createClickUpClient(connection, context.debug.enabled);
    const params: GetTaskCommentsQueryParams = {
      custom_task_ids: customTaskIds,
      team_id: teamId,
      start: startDate,
      start_id: startId,
    };

    const { data } = await client.get(`/task/${taskId}/comment`, {
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
    startId,
    startDate,
  },
});
