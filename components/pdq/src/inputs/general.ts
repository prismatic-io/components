import { input, util } from "@prismatic-io/spectral";
import { cleanKeyValueList, cleanString } from "../util";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const version = input({
  label: "Version",
  type: "string",
  required: true,
  example: "v1",
  placeholder: "Enter API version",
  comments: "API version",
});

export const customQueryParams = input({
  label: "Custom Query Params",
  type: "string",
  collection: "keyvaluelist",
  example: "key1=value1",
  required: false,
  comments: "Custom fields filter",
  placeholder: "Enter key=value pairs",
  clean: cleanKeyValueList,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  comments: "If true, fetch all data.",
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
  label: "Group",
  type: "string",
  required: false,
  comments: "The id of the group to filter by.",
  example: "123456",
  placeholder: "Enter group ID",
  clean: cleanString,
  dataSource: "selectGroup",
});

export const pageSize = input({
  label: "Page Size",
  type: "string",
  required: false,
  comments: "The number of records to return per page. Maximum is 100.",
  example: "100",
  placeholder: "Enter page size (max 100)",
  clean: cleanString,
});

export const page = input({
  label: "Page",
  type: "string",
  required: false,
  comments: "The page number to return.",
  example: "1",
  placeholder: "Enter page number",
  clean: cleanString,
});

export const sort = input({
  label: "Sort",
  type: "string",
  required: false,
  comments:
    "Sort by a field in camel case. By default a field name sorts with 'Asc'. Add the suffix 'Desc' to sort by that field in descending order.",
  example: "insertedAtDesc",
  placeholder: "Enter sort field (e.g., insertedAtDesc)",
  clean: cleanString,
});

export const filter = input({
  label: "Filter",
  type: "string",
  required: false,
  comments:
    "String filter values will filter on exact values unless a supported operator is provided.",
  example: JSON.stringify({ hostname: "~hostname" }),
  placeholder: "Enter filter as JSON",
  clean: cleanString,
});

export const listDefaultInputs = {
  fetchAll,
  pageSize,
  page,
  sort,
  filter,
  customQueryParams,
};
