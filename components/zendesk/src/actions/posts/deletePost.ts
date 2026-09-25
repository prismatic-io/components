import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { deletePostExamplePayload } from "../../examplePayloads";
import { deletePostInputs } from "../../inputs";
import { deletePostOutputSchema } from "../../outputSchemas";
export const deletePost = action({
  display: {
    label: "Delete Post",
    description: "Delete a post in the Help Center.",
  },
  performSafety: "notAllowed",
  perform: async (context, { postId, zendeskConnection }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.delete(`/community/posts/${postId}`);
    return {
      data,
    };
  },
  examplePerform: async () => deletePostExamplePayload,
  inputs: deletePostInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deletePostOutputSchema,
  }),
  examplePayload: deletePostExamplePayload,
});
