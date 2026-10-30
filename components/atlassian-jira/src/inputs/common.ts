import {
  input,
  type KeyValuePair,
  structuredObjectInput,
  util,
} from "@prismatic-io/spectral";
import { DEFAULT_MAX_RESULTS, DEFAULT_START_AT } from "../constants";
import {
  fieldValuesClean,
  toOptionalString,
  toPageSize,
  toTrimmedLowerCase,
} from "../util";

export const projectId = input({
  label: "Project ID",
  type: "string",
  placeholder: "Enter project ID",
  required: true,
  example: "10201",
  comments: "The unique identifier or name of the Jira project.",
  dataSource: "selectProject",
  clean: util.types.toString,
});

export const issueId = input({
  label: "Issue ID",
  type: "string",
  placeholder: "Enter issue ID",
  required: true,
  example: "10201",
  comments: "The unique identifier of the Jira issue.",
  dataSource: "selectIssue",
  clean: util.types.toString,
});

export const expand = input({
  label: "Expand",
  type: "string",
  placeholder: "Enter fields to expand",
  required: false,
  example: "body, version, history",
  comments:
    "A comma-separated list of additional fields to include in the response. Values come from the `_expandable` property of the resource.",
  clean: toOptionalString,
});

export const filter = input({
  label: "Filter",
  type: "string",
  placeholder: "Enter filter (e.g. my, favourite)",
  required: true,
  comments:
    "The scope used to limit returned dashboards. Common values are `my` (dashboards owned by the current user) and `favourite` (dashboards starred by the current user).",
  example: "my",
  default: "my",
  clean: util.types.toString,
});

export const description = input({
  label: "Description",
  type: "string",
  placeholder: "Enter issue description",
  required: false,
  example:
    "The login button does not respond on mobile devices in portrait mode.",
  comments: "A detailed description of the issue.",
  clean: toOptionalString,
});

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Jira connection to use.",
});

export const searchString = input({
  label: "Search",
  type: "string",
  placeholder: "Enter search query",
  required: true,
  example: "login bug",
  comments: "The text to match against records when searching.",
  clean: util.types.toString,
});

export const searchValue = input({
  label: "Search Value",
  type: "string",
  placeholder: "Enter search value",
  required: true,
  comments:
    "The text to look for. Matching ignores case and surrounding whitespace.",
  clean: toTrimmedLowerCase,
});

export const maxResults = input({
  label: "Max Results",
  type: "string",
  placeholder: "Enter max results",
  required: false,
  example: "50",
  comments: "The maximum number of results to return per page.",
  clean: (rawValue) => toPageSize(rawValue, DEFAULT_MAX_RESULTS),
});

export const startAt = input({
  label: "Start At",
  type: "string",
  placeholder: "Enter starting index",
  required: false,
  example: "0",
  default: "0",
  comments:
    "The index of the first item to return in the result set (0-based).",
  clean: (rawValue) => util.types.toInt(rawValue, DEFAULT_START_AT),
});

export const boardId = input({
  label: "Board ID",
  type: "string",
  placeholder: "Enter board ID",
  required: true,
  example: "10201",
  comments: "The unique identifier of the Jira board.",
  dataSource: "selectBoard",
  clean: util.types.toString,
});

export const projectKey = input({
  label: "Project Key",
  type: "string",
  placeholder: "Enter project key",
  required: false,
  example: "PROJ",
  comments: "The project key identifier (e.g., PROJ, ENG, SALES).",
  clean: toOptionalString,
});

export const fieldValues = input({
  label: "Values",
  type: "string",
  placeholder: "Enter field values",
  collection: "keyvaluelist",
  required: false,
  example: "projectId=1000,name=Example",
  comments:
    "Additional field names and their values to include when creating or updating the record. Each row is merged into the request payload.",
  clean: (value) => util.types.keyValPairListToObject(value as KeyValuePair[]),
});

export const dynamicValues = input({
  label: "Dynamic Fields",
  type: "code",
  language: "json",
  placeholder: "Enter dynamic fields JSON",
  required: false,
  example: JSON.stringify(
    [
      {
        key: "name",
        value: "Example Name",
      },
      {
        key: "projectId",
        value: "Example projectId",
      },
    ],
    null,
    2,
  ),
  comments:
    "Dynamic field key/value pairs supplied as JSON. Use a key/value config variable to configure these at deploy time. Each item must contain a `key` and a `value`.",
  clean: fieldValuesClean,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, automatically fetches all pages of results using pagination.",
  clean: util.types.toBool,
});

export const nextPageToken = input({
  label: "Next Page Token",
  type: "string",
  placeholder: "Enter next page token",
  required: false,
  comments:
    "The pagination cursor returned from a previous response. Use it to fetch the next page of results. Leave empty for the first page.",
  clean: toOptionalString,
});

export const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page and page-size controls.",
  inputs: { startAt, maxResults },
});

export const cursorPagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Cursor and page-size controls for paging through results.",
  inputs: { nextPageToken, maxResults },
});
