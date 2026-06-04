import { action } from "@prismatic-io/spectral";
import { connectionInput, postId } from "../../inputs";
import { rawHttpClient } from "../../auth";
import type { Post } from "../../types";
import { createPostPayload } from "../../examplePayloads";

export const getPost = action({
  display: {
    label: "Get Post",
    description: "Get a post from the Help Center.",
  },
  perform: async (context, { postId, zendeskConnection }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.get<{ post: Post }>(
      `/community/posts/${postId}`,
    );

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    postId,
  },
  examplePayload: { data: createPostPayload },
});
