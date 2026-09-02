import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteCommentExamplePayload } from "../../examplePayloads";
import { deleteCommentInputs } from "../../inputs";
import { deleteCommentOutputSchema } from "../../outputSchemas";
export const deleteComment = action({
  display: {
    label: "Delete Comment",
    description: "Deletes a comment.",
  },
  inputs: deleteCommentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteCommentOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, commentId }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/comments/delete", {
      commentID: commentId,
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => deleteCommentExamplePayload,
  examplePayload: deleteCommentExamplePayload,
});
