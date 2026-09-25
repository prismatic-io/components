import { structuredObjectInput } from "@prismatic-io/spectral";
import {
  cleanNumber,
  cleanString,
  convertBooleanInputIntoUpdateInput,
} from "../util";
import { postSortByOptions } from "../constants";
import {
  connectionInput,
  contentTagIds,
  fetchAll,
  isPostClosed,
  isPostFeatured,
  isPostPinned,
  notifySubscribers,
  pagination,
  postDetails,
  postFilterBy,
  postId,
  postStatus,
  postTitle,
  sortBy,
  topicId,
} from "./common";
export const createPostInputs = {
  zendeskConnection: connectionInput,
  topicId: {
    ...topicId,
    comments: "The ID of the topic to create the post in.",
    required: false,
    clean: cleanNumber,
  },
  postTitle,
  postDetails,
  isPostFeatured,
  isPostPinned,
  postStatus,
  notifySubscribers,
  contentTagIds,
};
export const deletePostInputs = {
  zendeskConnection: connectionInput,
  postId,
};
export const getPostInputs = {
  zendeskConnection: connectionInput,
  postId,
};
export const listPostsInputs = {
  zendeskConnection: connectionInput,
  filterBy: postFilterBy,
  topicId: {
    ...topicId,
    required: false,
    clean: cleanNumber,
  },
  sortBy: {
    ...sortBy,
    model: postSortByOptions,
  },
  fetchAll,
  pagination,
};
export const updatePostInputs = {
  zendeskConnection: connectionInput,
  postId,
  postTitle: {
    ...postTitle,
    required: false,
    clean: cleanString,
  },
  postDetails,
  postStatus,
  topicId: {
    ...topicId,
    required: false,
    clean: cleanNumber,
  },
  moderationFlags: structuredObjectInput({
    label: "Moderation Flags",
    comments:
      "Whether the record is featured, pinned, or closed to new comments.",
    inputs: {
      isPostFeatured: convertBooleanInputIntoUpdateInput(isPostFeatured),
      isPostPinned: convertBooleanInputIntoUpdateInput(isPostPinned),
      isPostClosed: convertBooleanInputIntoUpdateInput(isPostClosed),
    },
  }),
  contentTagIds,
};
