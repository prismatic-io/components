import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { updateCommentExamplePayload } from "../../examplePayloads";
import { updateCommentInputs } from "../../inputs";
import type { UpdateCommentBody } from "../../types";
export const updateComment = action({
  display: {
    label: "Update Comment",
    description:
      "Replace the content of a task comment, assign a comment, and mark a comment as resolved.",
  },
  examplePayload: updateCommentExamplePayload,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, commentId, commentText, resolved, assigneeId },
  ) => {
    const client = createClickUpClient(connection, context.debug.enabled);
    const body: UpdateCommentBody = {
      comment_text: commentText,
      assignee: assigneeId,
      resolved,
    };
    const { data } = await client.put(`/comment/${commentId}`, body);
    return {
      data,
    };
  },
  examplePerform: async () => updateCommentExamplePayload,
  inputs: updateCommentInputs,
});
