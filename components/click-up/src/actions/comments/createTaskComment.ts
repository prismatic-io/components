import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { createTaskCommentExamplePayload } from "../../examplePayloads";
import {
  assigneeId,
  connectionInput,
  getCommentText,
  getCustomTaskIds,
  getNotifyAll,
  getTaskId,
  getTeamId,
} from "../../inputs";
import type { CreateTaskCommentBody } from "./types/CreateTaskCommentBody";
import type { CreateTaskCommentQueryParams } from "./types/CreateTaskCommentQueryParams";

const taskId = getTaskId(true, "Task ID");
const customTaskIds = getCustomTaskIds(false);
const teamId = getTeamId(false, "Only used when the custom_task_ids parameter is set to true.");
const commentText = getCommentText(true, "Comment Text");
const notifyAll = getNotifyAll(
  true,
  "If notify_all is true, notifications will be sent to everyone including the creator of the comment.",
  true
);

export const createTaskComment = action({
  display: {
    label: "Create Task Comment",
    description: "Add a new comment to a task.",
  },
  examplePayload: createTaskCommentExamplePayload,
  perform: async (context, { connection, customTaskIds, teamId, commentText, notifyAll, assigneeId, taskId }) => {
    const client = createClickUpClient(connection, context.debug.enabled);
    const body: CreateTaskCommentBody = {
      comment_text: commentText,
      assignee: assigneeId,
      notify_all: notifyAll,
    };

    const params: CreateTaskCommentQueryParams = {
      custom_task_ids: customTaskIds,
      team_id: teamId,
    };

    const { data } = await client.post(`/task/${taskId}/comment`, body, {
      params,
    });

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    taskId,
    customTaskIds,
    teamId,
    commentText,
    notifyAll,
    assigneeId: {
      ...assigneeId,
      required: false,
    },
  },
});
