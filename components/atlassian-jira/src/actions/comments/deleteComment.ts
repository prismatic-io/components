import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { deleteCommentExamplePayload } from "../../examplePayloads";
import { commentId, connectionInput, issueId } from "../../inputs";

export const deleteComment = action({
  display: {
    label: "Delete Comment",
    description: "Delete a comment from an issue.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const { data } = await client.delete(`/issue/${params.issueId}/comment/${params.commentId}`);
    return { data };
  },
  inputs: {
    jiraConnection: connectionInput,
    issueId,
    commentId,
  },
  examplePayload: deleteCommentExamplePayload,
});
