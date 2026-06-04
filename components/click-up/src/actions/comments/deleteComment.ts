import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { deleteCommentExamplePayload } from "../../examplePayloads";
import { connectionInput, getCommentId } from "../../inputs";

const commentId = getCommentId(true, "Comment ID");

export const deleteComment = action({
  display: {
    label: "Delete Comment",
    description: "Delete a task comment.",
  },
  examplePayload: deleteCommentExamplePayload,
  perform: async (context, { connection, commentId }) => {
    const client = createClickUpClient(connection, context.debug.enabled);

    const { data } = await client.delete(`/comment/${commentId}`);

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    commentId,
  },
});
