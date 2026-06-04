import { input, util } from "@prismatic-io/spectral";
import { toOptionalObject, toOptionalString } from "../util";
import {
  additionalFields,
  authorId,
  boardId,
  boardIdRequired,
  companyId,
  connection,
  customFields,
  fetchAll,
  imageURLs,
  limit,
  postId,
  skip,
} from "./common";

const authorIdRequired = input({
  label: "Author ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the post author.",
  clean: util.types.toString,
  dataSource: "selectUser",
  placeholder: "Enter author ID",
  example: "553c3ef8b8cdcd1501ba9999",
});

const title = input({
  label: "Title",
  type: "string",
  required: true,
  comments: "The title of the post.",
  clean: util.types.toString,
  placeholder: "Enter post title",
  example: "Add dark mode support",
});

const titleOptional = input({
  label: "Title",
  type: "string",
  required: false,
  comments: "Updated post title.",
  clean: toOptionalString,
  placeholder: "Enter post title",
  example: "Add dark mode support",
});

const details = input({
  label: "Details",
  type: "text",
  required: true,
  comments: "The content or description of the post.",
  clean: util.types.toString,
  placeholder: "Enter post details",
  example: "It would be great to have a dark mode option for the dashboard.",
});

const detailsOptional = input({
  label: "Details",
  type: "text",
  required: false,
  comments: "Updated post content.",
  clean: toOptionalString,
  placeholder: "Enter post details",
  example: "Updated description for the feature request.",
});

const search = input({
  label: "Search",
  type: "string",
  required: false,
  comments: "Search term to filter posts.",
  clean: toOptionalString,
  placeholder: "Enter search term",
  example: "dark mode",
});

const sort = input({
  label: "Sort",
  type: "string",
  required: false,
  comments: "Sort order for post results.",
  clean: toOptionalString,
  model: [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Relevance", value: "relevance" },
    { label: "Score", value: "score" },
    { label: "Status Changed", value: "statusChanged" },
    { label: "Trending", value: "trending" },
  ],
  placeholder: "Enter sort order",
  example: "newest",
});

const status = input({
  label: "Status",
  type: "string",
  required: false,
  comments: "Comma-separated list of statuses to filter by.",
  clean: toOptionalString,
  placeholder: "Enter status filter",
  example: "open,planned",
});


const statusRequired = input({
  label: "Status",
  type: "string",
  required: true,
  comments:
    "The new status value (e.g., open, under review, planned, in progress, complete, closed).",
  clean: util.types.toString,
  placeholder: "Enter status",
  example: "planned",
});

const changerId = input({
  label: "Changer ID",
  type: "string",
  required: true,
  comments: "The admin performing the status change.",
  clean: util.types.toString,
  dataSource: "selectUser",
  placeholder: "Enter admin user ID",
  example: "553c3ef8b8cdcd1501ba9999",
});

const shouldNotifyVoters = input({
  label: "Notify Voters",
  type: "boolean",
  required: true,
  comments: "When true, notifies voters of the status change.",
  clean: util.types.toBool,
});

const postCommentValue = input({
  label: "Comment",
  type: "text",
  required: false,
  comments: "Optional comment to attach to the status change.",
  clean: toOptionalString,
  placeholder: "Enter comment",
  example: "We've moved this to our roadmap.",
});

const categoryId = input({
  label: "Category ID",
  type: "string",
  required: false,
  comments: "Category to assign to the post.",
  clean: toOptionalString,
  dataSource: "selectCategory",
  placeholder: "Enter category ID",
  example: "553c3ef8b8cdcd1501baabcd",
});

const eta = input({
  label: "ETA",
  type: "string",
  required: false,
  comments: "Estimated delivery date in MM/YYYY format.",
  clean: toOptionalString,
  placeholder: "Enter ETA",
  example: "06/2025",
});

const etaPublic = input({
  label: "ETA Public",
  type: "boolean",
  required: false,
  comments: "When true, the ETA is visible to all users.",
  clean: util.types.toBool,
});

const tagIDs = input({
  label: "Tag IDs",
  type: "code",
  language: "json",
  required: false,
  comments: "JSON array of tag IDs to filter by.",
  clean: toOptionalObject,
  example: JSON.stringify(["553c3ef8b8cdcd1501ba4444"], null, 2),
});

export const listPostsInputs = {
  connection,
  boardId,
  authorId,
  companyId,
  tagIDs,
  fetchAll,
  limit,
  skip,
  search,
  sort,
  status,
};

export const retrievePostInputs = { connection, postId };

export const createPostInputs = {
  connection,
  boardIdRequired,
  authorIdRequired,
  title,
  details,
  categoryId,
  customFields,
  eta,
  etaPublic,
  imageURLs,
  additionalFields,
};

export const updatePostInputs = {
  connection,
  postId,
  titleOptional,
  detailsOptional,
  customFields,
  eta,
  imageURLs,
  additionalFields,
};

export const deletePostInputs = { connection, postId };

export const changePostStatusInputs = {
  connection,
  postId,
  statusRequired,
  changerId,
  shouldNotifyVoters,
  postCommentValue,
  additionalFields,
};

export const selectPostInputs = {
  connection,
  boardId: { ...boardId, dataSource: undefined },
};
