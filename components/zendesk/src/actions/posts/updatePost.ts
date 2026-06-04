import { action } from "@prismatic-io/spectral";
import {
  connectionInput,
  contentTagIds,
  isPostClosed,
  isPostFeatured,
  isPostPinned,
  postDetails,
  postId,
  postStatus,
  postTitle,
  topicId,
} from "../../inputs";
import { rawHttpClient } from "../../auth";
import type { Post } from "../../types";
import { createPostPayload } from "../../examplePayloads";
import { convertBooleanInputIntoUpdateInput } from "../../util";

export const updatePost = action({
  display: {
    label: "Update Post",
    description: "Update a post in the Help Center.",
  },
  perform: async (
    context,
    {
      postId,
      zendeskConnection,
      isPostClosed,
      isPostFeatured,
      isPostPinned,
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
        title: postTitle || undefined,
        content_tag_ids: contentTagIds.length ? contentTagIds : undefined,
        details: postDetails || undefined,
        featured: isPostFeatured,
        pinned: isPostPinned,
        status: postStatus || undefined,
        topic_id: topicId || undefined,
        closed: isPostClosed,
      },
    };

    const { data } = await client.put<{ post: Post }>(url, payload);

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    postId,
    postTitle: {
      ...postTitle,
      required: false,
    },
    postDetails,
    postStatus,
    topicId: {
      ...topicId,
      required: false,
    },
    isPostFeatured: convertBooleanInputIntoUpdateInput(isPostFeatured),
    isPostPinned: convertBooleanInputIntoUpdateInput(isPostPinned),
    isPostClosed: convertBooleanInputIntoUpdateInput(isPostClosed),
    contentTagIds,
  },
  examplePayload: {
    data: createPostPayload,
  },
});
