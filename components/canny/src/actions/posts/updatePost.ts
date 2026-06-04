import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updatePostExamplePayload } from "../../examplePayloads";
import { updatePostInputs } from "../../inputs";

export const updatePost = action({
  display: {
    label: "Update Post",
    description: "Updates an existing post.",
  },
  inputs: updatePostInputs,
  perform: async (
    context,
    {
      connection,
      postId,
      titleOptional,
      detailsOptional,
      customFields,
      eta,
      imageURLs,
      additionalFields,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/posts/update", {
      postID: postId,
      title: titleOptional,
      details: detailsOptional,
      customFields,
      eta,
      imageURLs,
      ...additionalFields,
    });
    return { data };
  },
  examplePayload: updatePostExamplePayload,
});
