import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { MY_DRIVE } from "../constants";
import { cleanIntegerInput, cleanStringInput } from "../util";
export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Connection to use for Google Drive authorization.",
});
export const driveId = input({
  label: "Drive ID",
  type: "string",
  required: false,
  placeholder: "Enter Drive ID",
  comments: `The ID of a shared drive to search for the file in. If not provided, the search will be performed across all drives. Enter '${MY_DRIVE}' to search only "My Drive".`,
  clean: cleanStringInput,
  example: "0AAvGyortvuqEXAMPLE",
  dataSource: "selectDrive",
});
export const folderId = input({
  label: "Folder ID",
  placeholder: "Enter Folder ID",
  type: "string",
  required: false,
  example: "1xYz2AbC3DeF4GhI5JkL",
  comments: "A unique opaque ID for each folder.",
  clean: cleanStringInput,
  dataSource: "selectFolder",
});
export const fields = input({
  label: "Fields",
  type: "string",
  required: false,
  default: "*",
  placeholder: "Enter fields to return",
  comments:
    "Fields to return in the response. For list operations, wrap field names in files(), e.g., files(id,name,mimeType). If unspecified, returns all fields. See [Google's fields parameter documentation](https://developers.google.com/workspace/drive/api/guides/fields-parameter).",
  example: "files(id,name,mimeType,size,modifiedTime)",
  clean: cleanStringInput,
});
export const pageSize = input({
  label: "Page Size",
  type: "string",
  required: false,
  placeholder: "Enter page size (1-1000)",
  comments:
    "The maximum number of results to return. Must be between 1 and 1000.",
  example: "20",
  default: "20",
  clean: cleanIntegerInput,
});
export const pageToken = input({
  label: "Page Token",
  type: "string",
  required: false,
  comments:
    "Specify the pagination token that's returned by a previous request to retrieve the next page of results",
  example: "lslTXFcbLQKkb0vP9Kgh5hy0Y0OnC7Z9ZPHPwPmMnxSk3eiDRMkct7D8E",
  placeholder: "Enter page token",
  clean: cleanStringInput,
});
export const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page-size and page-token controls for paging through results.",
  inputs: { pageSize, pageToken },
});
export const query = input({
  label: "Query",
  type: "string",
  required: false,
  placeholder: "Enter query string",
  comments:
    "A query string to filter results. See [Google's documentation](https://developers.google.com/workspace/drive/api/guides/search-files) for query syntax.",
  example: "name contains 'report'",
  clean: cleanStringInput,
});
export const searchQuery = input({
  label: "Search",
  type: "string",
  required: false,
  placeholder: "Enter search terms",
  comments: "Search terms to filter results.",
  example: "quarterly report 2024",
  clean: cleanStringInput,
});
export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
  default: "false",
  comments:
    "When true, automatically fetches all pages of results using pagination.",
});
