import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { createPostExamplePayload } from "../../examplePayloads";
import { createPostInputs } from "../../inputs";
import { createPostOutputSchema } from "../../outputSchemas";
import type { Post } from "../../types";
export const createPost = action({
  display: {
    label: "Create Post",
    description: "Create a new post in the Help Center.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      postDetails,
      isPostFeatured,
      isPostPinned,
      postStatus,
      postTitle,
      topicId,
      notifySubscribers,
      contentTagIds,
      zendeskConnection,
    },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const payload = {
      post: {
        topic_id: topicId,
        status: postStatus,
        pinned: isPostPinned,
        title: postTitle,
        details: postDetails,
        featured: isPostFeatured,
        content_tag_ids: contentTagIds,
      },
      notify_subscribers: notifySubscribers,
    };
    const { data } = await client.post<{
      post: Post;
    }>("/community/posts", payload);
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    { contentTagIds, isPostFeatured, postTitle },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...createPostExamplePayload.data,
      post: {
        ...createPostExamplePayload.data.post,
        ...(postTitle ? { title: postTitle } : {}),
        featured: isPostFeatured,
        ...(contentTagIds?.length ? { content_tag_ids: contentTagIds } : {}),
      },
    },
  }),
  inputs: createPostInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createPostOutputSchema,
  }),
  examplePayload: createPostExamplePayload,
});
