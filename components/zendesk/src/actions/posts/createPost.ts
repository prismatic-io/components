import { action } from "@prismatic-io/spectral";
import {
  connectionInput,
  contentTagIds,
  postTitle,
  postDetails,
  isPostFeatured,
  isPostPinned,
  postStatus,
  topicId,
  notifySubscribers,
} from "../../inputs";
import { rawHttpClient } from "../../auth";
import type { Post } from "../../types";
import { createPostPayload } from "../../examplePayloads";

export const createPost = action({
  display: {
    label: "Create Post",
    description: "Create a new post in the Help Center.",
  },
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
        topic_id: topicId || undefined,
        status: postStatus || undefined,
        pinned: isPostPinned,
        title: postTitle,
        details: postDetails || undefined,
        featured: isPostFeatured,
        content_tag_ids: contentTagIds || undefined,
      },
      notify_subscribers: notifySubscribers,
    };

    const { data } = await client.post<{ post: Post }>(
      "/community/posts",
      payload,
    );

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    topicId: {
      ...topicId,
      comments: "The ID of the topic to create the post in.",
      required: false,
    },
    postTitle,
    postDetails,
    isPostFeatured,
    isPostPinned,
    postStatus,
    notifySubscribers,
    contentTagIds,
  },
  examplePayload: { data: createPostPayload },
});
