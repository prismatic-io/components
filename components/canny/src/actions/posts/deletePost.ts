import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deletePostExamplePayload } from "../../examplePayloads";
import { deletePostInputs } from "../../inputs";

export const deletePost = action({
  display: {
    label: "Delete Post",
    description: "Deletes a post.",
  },
  inputs: deletePostInputs,
  perform: async (context, { connection, postId }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/posts/delete", { postID: postId });
    return { data };
  },
  examplePayload: deletePostExamplePayload,
});
