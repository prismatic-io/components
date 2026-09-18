import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { ALL_LEVELS_AUTHENTICATION_INPUT_MODEL } from "../constants";
import { cleanString, toOptionalString } from "../util";
export const connectionInput = input({
  label: "Connection",
  comments: "The Dropbox connection to use.",
  type: "connection",
  required: true,
});
export const userType = input({
  label: "Team User Type",
  comments:
    "The team member context the request runs as: Admin acts with team admin privileges, User acts as the member themselves. This takes effect only when Team Member ID is also set.",
  type: "string",
  required: false,
  model: ALL_LEVELS_AUTHENTICATION_INPUT_MODEL,
  clean: (value) => (value !== "" ? (value as "admin" | "user") : undefined),
});
export const teamMemberId = input({
  label: "Team Member ID",
  comments: "The ID of the team member. Required if Team User Type is set",
  placeholder: "Enter team member ID",
  type: "string",
  required: false,
  clean: (value) => (value !== "" ? util.types.toString(value) : undefined),
  example: "dbmid:abcd1234",
});
export const limit = input({
  label: "Limit",
  placeholder: "Enter the maximum number of results per request",
  type: "string",
  required: false,
  comments:
    "The maximum number of results to return per request. Note: This is an approximate number and there can be slightly more entries returned in some cases.",
  example: "25",
  clean: (value: unknown) => {
    const num = util.types.toNumber(value);
    return num || undefined;
  },
});
export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, automatically fetches all pages of results using pagination. Cursor and Limit inputs are ignored when this is enabled.",
  required: false,
  default: "false",
});
export const cursor = input({
  label: "Cursor",
  placeholder: "Enter the pagination cursor from a previous request",
  type: "string",
  required: false,
  comments:
    "The pagination cursor returned by a previous request, from Dropbox's `list_folder` and `list_folder/continue` endpoints. Leave empty to start from the first page.",
  example: "lslTXFcbLQKkb0vP9Kgh5hy0Y0OnC7Z9ZPHPwPmMnxSk3eiDRMkct7D8E",
  clean: toOptionalString,
});
export const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Cursor and page-size controls for paging through results.",
  inputs: { cursor, limit },
});
export const path = input({
  label: "Path",
  placeholder: "Enter the file path",
  type: "string",
  required: true,
  comments:
    "The location of a file within a Dropbox share. Include a leading /.",
  example: "/path/to/file.txt",
  clean: util.types.toString,
  dataSource: "listFolders",
});
export const directoryPath = input({
  label: "Directory Path",
  placeholder: "Enter the directory path",
  type: "string",
  required: false,
  comments:
    "The path to a directory within a Dropbox share. Include a leading /.",
  example: "/path/to/my/directory/",
  clean: cleanString,
  dataSource: "listFolders",
});
