import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteCommentExamplePayload } from "../../examplePayloads";
import { deleteCommentInputs } from "../../inputs";

export const deleteComment = action({
  display: {
    label: "Delete Comment",
    description: "Deletes a comment.",
  },
  inputs: deleteCommentInputs,
  perform: async (context, { connection, commentId }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/comments/delete", {
      commentID: commentId,
    });
    return { data };
  },
  examplePayload: deleteCommentExamplePayload,
});
