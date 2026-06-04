import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createCommentExamplePayload } from "../../examplePayloads";
import { createCommentInputs } from "../../inputs";

export const createComment = action({
  display: {
    label: "Create Comment",
    description: "Creates a new comment on a post.",
  },
  inputs: createCommentInputs,
  perform: async (
    context,
    {
      connection,
      postId,
      commentAuthorId,
      commentValue,
      internal,
      parentId,
      imageURLs,
      additionalFields,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/comments/create", {
      postID: postId,
      authorID: commentAuthorId,
      value: commentValue,
      internal,
      parentID: parentId,
      imageURLs,
      ...additionalFields,
    });
    return { data };
  },
  examplePayload: createCommentExamplePayload,
});
