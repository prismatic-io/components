import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { updateCommentExamplePayload } from "../../examplePayloads";
import { assigneeId, connectionInput, getCommentId, getCommentText, getResolved } from "../../inputs";
import type { UpdateCommentBody } from "./types/UpdateCommentBody";

const commentId = getCommentId(true, "Comment ID");
const commentText = getCommentText(true, "Comment Text");
const resolved = getResolved(true, "Resolved?", false);

export const updateComment = action({
  display: {
    label: "Update Comment",
    description: "Replace the content of a task comment, assign a comment, and mark a comment as resolved.",
  },
  examplePayload: updateCommentExamplePayload,
  perform: async (context, { connection, commentId, commentText, resolved, assigneeId }) => {
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
  inputs: {
    connection: connectionInput,
    commentId,
    commentText,
    resolved,
    assigneeId,
  },
});
