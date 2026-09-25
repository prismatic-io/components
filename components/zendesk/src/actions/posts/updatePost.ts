import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { updatePostExamplePayload } from "../../examplePayloads";
import { updatePostInputs } from "../../inputs";
import { updatePostOutputSchema } from "../../outputSchemas";
import type { Post } from "../../types";
export const updatePost = action({
  display: {
    label: "Update Post",
    description: "Update a post in the Help Center.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      postId,
      zendeskConnection,
      moderationFlags,
      postDetails,
      postStatus,
      postTitle,
      topicId,
      contentTagIds,
    },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const url = `/community/posts/${postId}`;
    const payload = {
      post: {
        title: postTitle,
        content_tag_ids: contentTagIds,
        details: postDetails,
        featured: moderationFlags.isPostFeatured,
        pinned: moderationFlags.isPostPinned,
        status: postStatus,
        topic_id: topicId,
        closed: moderationFlags.isPostClosed,
      },
    };
    const { data } = await client.put<{
      post: Post;
    }>(url, payload);
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    { contentTagIds, moderationFlags, postId, postTitle },
  ) => ({
    data: {
      ...updatePostExamplePayload.data,
      post: {
        ...updatePostExamplePayload.data.post,
        ...(postId ? { id: postId } : {}),
        ...(postTitle ? { title: postTitle } : {}),
        ...(moderationFlags.isPostFeatured === undefined
          ? {}
          : { featured: moderationFlags.isPostFeatured }),
        ...(contentTagIds ? { content_tag_ids: contentTagIds } : {}),
      },
    },
  }),
  inputs: updatePostInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updatePostOutputSchema,
  }),
  examplePayload: updatePostExamplePayload,
});
