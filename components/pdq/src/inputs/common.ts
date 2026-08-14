import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanKeyValueList, cleanNumber, cleanString } from "../util";
export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The PDQ connection to use.",
});
const customQueryParams = input({
  label: "Custom Query Params",
  type: "string",
  collection: "keyvaluelist",
  example: "key1=value1",
  required: false,
  comments: "Additional query parameters to include in the request.",
  placeholder: "Enter key=value pairs",
  clean: cleanKeyValueList,
});
const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, automatically fetches all pages of results using pagination.",
  clean: util.types.toBool,
});
export const includes = input({
  label: "Includes",
  type: "string",
  required: false,
  comments: "Include related resources.",
  example: "networking,processors",
  placeholder: "Enter related resources (comma-separated)",
  clean: cleanString,
});
export const group = input({
  label: "Group ID",
  type: "string",
  required: false,
  comments: "The id of the group to filter by.",
  example: "123456",
  placeholder: "Enter group ID",
  clean: cleanString,
  dataSource: "selectGroup",
});
const pageSize = input({
  label: "Page Size",
  type: "string",
  required: false,
  comments: "The number of records to return per page. Maximum is 100.",
  example: "100",
  placeholder: "Enter page size (max 100)",
  clean: cleanNumber,
});
const page = input({
  label: "Page",
  type: "string",
  required: false,
  comments: "The page number to return. Page numbering starts at 1.",
  example: "1",
  placeholder: "Enter page number",
  clean: cleanNumber,
});
export const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page number and page size to control result paging.",
  inputs: { page, pageSize },
});
const sort = input({
  label: "Sort",
  type: "string",
  required: false,
  comments:
    "Sort by a field in camel case. By default a field name sorts with 'Asc'. Add the suffix 'Desc' to sort by that field in descending order.",
  example: "insertedAtDesc",
  placeholder: "Enter sort field (e.g., insertedAtDesc)",
  clean: cleanString,
});
const filter = input({
  label: "Filter",
  type: "string",
  required: false,
  comments:
    "String filter values will filter on exact values unless a supported operator is provided.",
  example: JSON.stringify({ hostname: "~hostname" }),
  placeholder: "Enter filter as JSON",
  clean: cleanString,
});
export const filters = structuredObjectInput({
  label: "Filters",
  required: false,
  comments: "Optional query controls to sort and refine the results.",
  inputs: { sort, filter },
});
export const listDefaultInputs = {
  fetchAll,
  pagination,
  filters,
  customQueryParams,
};
