import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { deleteCommentExamplePayload } from "../../examplePayloads";
import { deleteCommentInputs } from "../../inputs";
export const deleteComment = action({
  display: {
    label: "Delete Comment",
    description: "Delete a task comment.",
  },
  examplePayload: deleteCommentExamplePayload,
  performSafety: "notAllowed",
  perform: async (context, { connection, commentId }) => {
    const client = createClickUpClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/comment/${commentId}`);
    return {
      data,
    };
  },
  examplePerform: async () => deleteCommentExamplePayload,
  inputs: deleteCommentInputs,
});
