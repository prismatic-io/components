import { action, outputSchema } from "@prismatic-io/spectral";
import { getPostInputs } from "../../inputs";
import { rawHttpClient } from "../../auth";
import { getPostOutputSchema } from "../../outputSchemas";
import type { Post } from "../../types";
import { getPostExamplePayload } from "../../examplePayloads";
export const getPost = action({
  display: {
    label: "Get Post",
    description: "Get a post from the Help Center.",
  },
  performSafety: "safe",
  perform: async (context, { postId, zendeskConnection }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.get<{
      post: Post;
    }>(`/community/posts/${postId}`);
    return {
      data,
    };
  },
  inputs: getPostInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPostOutputSchema,
  }),
  examplePayload: getPostExamplePayload,
});
