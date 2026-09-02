import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createCommentExamplePayload } from "../../examplePayloads";
import { createCommentInputs } from "../../inputs";
import { createCommentOutputSchema } from "../../outputSchemas";
export const createComment = action({
  display: {
    label: "Create Comment",
    description: "Creates a new comment on a post.",
  },
  inputs: createCommentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createCommentOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      postId,
      commentAuthorId,
      commentValue,
      parentId,
      additionalFields,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/comments/create", {
      postID: postId,
      authorID: commentAuthorId,
      value: commentValue,
      internal: additionalFields.internal,
      parentID: parentId,
      imageURLs: additionalFields.imageURLs,
      ...additionalFields.additionalFields,
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => createCommentExamplePayload,
  examplePayload: createCommentExamplePayload,
});
