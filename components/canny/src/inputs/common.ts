import { input, util } from "@prismatic-io/spectral";
import {
  toObjectOrEmpty,
  toOptionalNumber,
  toOptionalObject,
  toOptionalString,
} from "../util";

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, automatically fetches all pages of results using pagination.",
  clean: util.types.toBool,
});

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Canny connection to use.",
});

export const limit = input({
  label: "Limit",
  type: "string",
  required: false,
  comments: "Number of results to return per page.",
  clean: toOptionalNumber,
  placeholder: "Enter limit",
  example: "10",
});

export const skip = input({
  label: "Skip",
  type: "string",
  required: false,
  comments: "The number of results to skip before returning data (0-based).",
  clean: toOptionalNumber,
  placeholder: "Enter skip count",
  example: "0",
});

export const cursor = input({
  label: "Cursor",
  type: "string",
  required: false,
  comments: "Pagination cursor from a previous response.",
  clean: toOptionalString,
  placeholder: "Enter cursor token",
  example: "next_abc123def456",
});

export const boardId = input({
  label: "Board ID",
  type: "string",
  required: false,
  comments: "Filter results by board.",
  clean: toOptionalString,
  dataSource: "selectBoard",
  placeholder: "Enter board ID",
  example: "553c3ef8b8cdcd1501ba1234",
});

export const boardIdRequired = input({
  label: "Board ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the board.",
  clean: util.types.toString,
  dataSource: "selectBoard",
  placeholder: "Enter board ID",
  example: "553c3ef8b8cdcd1501ba1234",
});

export const postId = input({
  label: "Post ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the post.",
  clean: util.types.toString,
  dataSource: "selectPost",
  placeholder: "Enter post ID",
  example: "553c3ef8b8cdcd1501ba5678",
});

export const postIdOptional = input({
  label: "Post ID",
  type: "string",
  required: false,
  comments: "Filter results by post.",
  clean: toOptionalString,
  dataSource: "selectPost",
  placeholder: "Enter post ID",
  example: "553c3ef8b8cdcd1501ba5678",
});

export const userIdOptional = input({
  label: "User ID",
  type: "string",
  required: false,
  comments: "Filter results by user.",
  clean: toOptionalString,
  dataSource: "selectUser",
  placeholder: "Enter user ID",
  example: "553c3ef8b8cdcd1501ba9999",
});

export const authorId = input({
  label: "Author ID",
  type: "string",
  required: false,
  comments: "Filter by or specify the post author.",
  clean: toOptionalString,
  dataSource: "selectUser",
  placeholder: "Enter author ID",
  example: "553c3ef8b8cdcd1501ba9999",
});

export const companyId = input({
  label: "Company ID",
  type: "string",
  required: false,
  comments: "Filter results by company.",
  clean: toOptionalString,
  dataSource: "selectCompany",
  placeholder: "Enter company ID",
  example: "553c3ef8b8cdcd1501ba1111",
});

export const customFields = input({
  label: "Custom Fields",
  type: "code",
  language: "json",
  required: false,
  comments: "Custom field key-value pairs as JSON.",
  clean: toOptionalObject,
  placeholder: "Enter custom fields",
  example: JSON.stringify({ key: "value" }, null, 2),
});

export const imageURLs = input({
  label: "Image URLs",
  type: "code",
  language: "json",
  required: false,
  comments: "JSON array of image URLs to attach.",
  clean: toOptionalObject,
  placeholder: "Enter image URLs",
  example: JSON.stringify(["https://example.com/image.png"], null, 2),
});

export const additionalFields = input({
  label: "Additional Fields",
  type: "code",
  language: "json",
  comments:
    "Additional fields that might not be covered by the standard inputs.",
  required: false,
  placeholder: "Enter additional fields",
  example: JSON.stringify({ email: "sally@netflix.com" }, null, 2),
  clean: toObjectOrEmpty,
});
