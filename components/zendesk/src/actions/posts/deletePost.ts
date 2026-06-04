import { action } from "@prismatic-io/spectral";
import { connectionInput, postId } from "../../inputs";
import { rawHttpClient } from "../../auth";

export const deletePost = action({
  display: {
    label: "Delete Post",
    description: "Delete a post in the Help Center.",
  },
  perform: async (context, { postId, zendeskConnection }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.delete(`/community/posts/${postId}`);

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    postId,
  },
  examplePayload: {
    data: null,
  },
});
