import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
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
  offsetPagination,
  postId,
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
  comments:
    "The headline shown in the board list and used for search matching.",
  clean: util.types.toString,
  placeholder: "Enter post title",
  example: "Add dark mode support",
});
const titleOptional = input({
  label: "Title",
  type: "string",
  required: false,
  comments:
    "Replaces the post headline. Leave blank to keep the current title.",
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
  comments: "Replaces the post body. Leave blank to keep the current details.",
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
  placeholder: "Enter tag IDs",
  example: JSON.stringify(["553c3ef8b8cdcd1501ba4444"], null, 2),
});
const listControls = structuredObjectInput({
  label: "List Controls",
  required: false,
  comments: "Search, sort, and status filter controls.",
  inputs: { search, sort, status },
});
const createPostAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Custom Fields, ETA, ETA Public, Image URLs, and Additional Fields.",
  inputs: { customFields, eta, etaPublic, imageURLs, additionalFields },
});
const updatePostAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Custom Fields, ETA, Image URLs, and Additional Fields.",
  inputs: { customFields, eta, imageURLs, additionalFields },
});
export const listPostsInputs = {
  connection,
  boardId,
  authorId,
  companyId,
  tagIDs,
  fetchAll,
  pagination: offsetPagination,
  listControls,
};
export const retrievePostInputs = { connection, postId };
export const createPostInputs = {
  connection,
  boardIdRequired,
  authorIdRequired,
  title,
  details,
  categoryId,
  additionalFields: createPostAdditionalFields,
};
export const updatePostInputs = {
  connection,
  postId,
  titleOptional,
  detailsOptional,
  additionalFields: updatePostAdditionalFields,
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
