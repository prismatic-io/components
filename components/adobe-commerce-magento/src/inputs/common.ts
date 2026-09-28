import { input, util } from "@prismatic-io/spectral";
import { cleanNumber, cleanString } from "../utils";
export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Adobe Commerce connection to use.",
});
export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, walks the result set page by page and returns every record instead of a single page. Page Size still controls how many records each page requests (100 when left blank), while Current Page is ignored because paging always restarts at page 1. Paging stops after 100 pages.",
  required: false,
  default: "false",
});
export const searchCriteriaCurrentPage = input({
  label: "Current Page",
  type: "string",
  required: false,
  comments:
    "The page of results to return, counting from 1. Ignored when Fetch All is enabled, which always starts at page 1.",
  placeholder: "Enter a page number",
  example: "1",
  clean: cleanNumber,
});
export const searchCriteriaConditionType = input({
  label: "Condition Type",
  type: "string",
  required: false,
  comments:
    "The Magento condition type used to compare Field against Value, such as an equality or range operator. Omit it to let Magento apply its own default comparison.",
  placeholder: "Enter a Magento condition type",
  example: "gteq",
  clean: cleanString,
});
export const searchCriteriaField = input({
  label: "Field",
  type: "string",
  required: false,
  comments:
    "The record field the search filter is applied to. Only one filter is supported: Field, Condition Type and Value together build `searchCriteria[filterGroups][0][filters][0]`, so a single request can filter on one field only.",
  placeholder: "Enter a field name to filter on",
  example: "updated_at",
  clean: cleanString,
});
export const searchCriteriaValue = input({
  label: "Value",
  type: "string",
  required: false,
  comments:
    "The value that Field is compared against. It belongs to the same single filter as Field and Condition Type, so only one value can be matched per request. Dates use the Magento `YYYY-MM-DD HH:MM:SS` UTC format rather than ISO 8601.",
  placeholder: "Enter a value to filter on",
  example: "2026-01-01 00:00:00",
  clean: cleanString,
});
export const searchCriteriaPageSize = input({
  label: "Page Size",
  type: "string",
  required: false,
  comments:
    "How many records to return per page. When Fetch All is enabled and this is left blank, each page requests 100 records.",
  placeholder: "Enter a page size",
  example: "50",
  clean: cleanNumber,
});
export const searchCriteriaSortDirection = input({
  label: "Sorting Direction",
  type: "string",
  required: false,
  comments:
    "The direction the Sorting Field is ordered in. It has no effect unless Sorting Field is also set.",
  placeholder: "Enter a sort direction",
  example: "DESC",
  clean: cleanString,
});
export const searchCriteriaSortField = input({
  label: "Sorting Field",
  type: "string",
  required: false,
  comments:
    "The record field that results are sorted by. Pair it with Sorting Direction to control the order.",
  placeholder: "Enter a field to sort by",
  example: "created_at",
  clean: cleanString,
});
