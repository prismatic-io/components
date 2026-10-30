import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { deleteCommentExamplePayload } from "../../examplePayloads";
import { deleteCommentInputs } from "../../inputs";

export const deleteComment = action({
  display: {
    label: "Delete Comment",
    description: "Delete a comment from an issue.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const { data } = await client.delete(
      `/issue/${params.issueId}/comment/${params.commentId}`,
    );
    return { data };
  },
  examplePerform: async () => deleteCommentExamplePayload,
  inputs: deleteCommentInputs,
  examplePayload: deleteCommentExamplePayload,
});
