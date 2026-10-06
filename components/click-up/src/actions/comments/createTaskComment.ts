import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { createTaskCommentExamplePayload } from "../../examplePayloads";
import { createTaskCommentInputs } from "../../inputs";
import { createTaskCommentOutputSchema } from "../../outputSchemas";
import type {
  CreateTaskCommentBody,
  CreateTaskCommentQueryParams,
} from "../../types";
export const createTaskComment = action({
  display: {
    label: "Create Task Comment",
    description: "Add a new comment to a task.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createTaskCommentOutputSchema,
  }),
  examplePayload: createTaskCommentExamplePayload,
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      customTaskIds,
      teamId,
      commentText,
      notifyAll,
      assigneeId,
      taskId,
    },
  ) => {
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
  examplePerform: async () => createTaskCommentExamplePayload,
  inputs: createTaskCommentInputs,
});
