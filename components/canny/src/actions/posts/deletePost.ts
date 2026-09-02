import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deletePostExamplePayload } from "../../examplePayloads";
import { deletePostInputs } from "../../inputs";
import { deletePostOutputSchema } from "../../outputSchemas";
export const deletePost = action({
  display: {
    label: "Delete Post",
    description: "Deletes a post.",
  },
  inputs: deletePostInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deletePostOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, postId }) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await client.post("/posts/delete", { postID: postId });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => deletePostExamplePayload,
  examplePayload: deletePostExamplePayload,
});
