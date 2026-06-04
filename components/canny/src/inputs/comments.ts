import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import {
  additionalFields,
  authorId,
  boardId,
  companyId,
  connection,
  cursor,
  fetchAll,
  imageURLs,
  limit,
  postId,
  postIdOptional,
} from "./common";

const commentId = input({
  label: "Comment ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the comment.",
  clean: util.types.toString,
  placeholder: "Enter comment ID",
  example: "553c3ef8b8cdcd1501ba2222",
});

const commentAuthorId = input({
  label: "Author ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the comment author.",
  clean: util.types.toString,
  dataSource: "selectUser",
  placeholder: "Enter author ID",
  example: "553c3ef8b8cdcd1501ba9999",
});

const commentValue = input({
  label: "Comment Text",
  type: "text",
  required: true,
  comments: "The text content of the comment.",
  clean: util.types.toString,
  placeholder: "Enter comment text",
  example: "Great idea! We should prioritize this.",
});

const internal = input({
  label: "Internal",
  type: "boolean",
  required: false,
  comments:
    "When true, the comment is internal-only and not visible to end users.",
  clean: util.types.toBool,
});

const parentId = input({
  label: "Parent Comment ID",
  type: "string",
  required: false,
  comments: "Parent comment ID for threaded replies.",
  clean: toOptionalString,
  placeholder: "Enter parent comment ID",
  example: "553c3ef8b8cdcd1501ba2222",
});

export const listCommentsInputs = {
  connection,
  boardId,
  postIdOptional,
  authorId,
  companyId,
  fetchAll,
  cursor,
  limit,
};

export const retrieveCommentInputs = { connection, commentId };

export const createCommentInputs = {
  connection,
  postId,
  commentAuthorId,
  commentValue,
  internal,
  parentId,
  imageURLs,
  additionalFields,
};

export const deleteCommentInputs = { connection, commentId };
