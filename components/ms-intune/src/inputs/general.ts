import { input, util } from "@prismatic-io/spectral";
import {
  cleanBodyInput,
  cleanStringInput,
  generateApiVersionModel,
} from "../util";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Microsoft Intune connection to use.",
});

export const apiVersion = input({
  label: "API Version",
  type: "string",
  model: generateApiVersionModel(),
  required: true,
  comments: "The version of the API to use.",
  clean: cleanStringInput,
});

export const $filter = input({
  label: "Filter",
  type: "string",
  comments:
    "OData filter expression to filter results. Supports operators like eq, ne, startswith, contains.",
  required: false,
  placeholder: "Enter filter expression",
  example: "startswith(givenName,'J')",
  default: "",
  clean: cleanStringInput,
});

export const $select = input({
  label: "Select",
  type: "string",
  comments:
    "Comma-separated list of properties to include in the response. Reduces payload size.",
  required: false,
  placeholder: "Enter properties to select",
  example: "id,displayName,mail",
  clean: cleanStringInput,
});

export const $expand = input({
  label: "Expand",
  type: "string",
  comments:
    "Comma-separated list of relationships to expand and include in the response.",
  required: false,
  placeholder: "Enter relationships to expand",
  example: "members,owners",
  clean: cleanStringInput,
});

export const $orderBy = input({
  label: "Order By",
  type: "string",
  comments:
    "Property to sort results by. Add 'asc' or 'desc' suffix for sort direction.",
  required: false,
  placeholder: "Enter sort expression",
  example: "displayName desc",
  clean: cleanStringInput,
});

export const $top = input({
  label: "Top",
  type: "string",
  comments: "Maximum number of results to return per page.",
  required: false,
  placeholder: "Enter page size",
  example: "50",
  clean: cleanStringInput,
});

export const $skip = input({
  label: "Skip",
  type: "string",
  comments: "Number of results to skip. Use with $top for manual pagination.",
  required: false,
  placeholder: "Enter number to skip",
  example: "100",
  clean: cleanStringInput,
});

export const $count = input({
  label: "Count",
  type: "boolean",
  comments: "When true, retrieves the total count of matching resources.",
  required: false,
  default: "false",
});

export const $search = input({
  label: "Search",
  type: "string",
  comments:
    "Returns results based on search criteria. Use format 'property:value' for specific searches.",
  required: false,
  placeholder: "Enter search query",
  example: "displayName:Marketing",
  clean: cleanStringInput,
});

export const $format = input({
  label: "Format",
  type: "string",
  comments: "Response format. Typically 'json' for JSON output.",
  required: false,
  placeholder: "Enter response format",
  example: "json",
  clean: cleanStringInput,
});

export const $skipToken = input({
  label: "Skip Token",
  type: "string",
  comments:
    "Token from a previous response's @odata.nextLink to retrieve the next page of results.",
  required: false,
  placeholder: "Enter skip token from previous response",
  example: "X%274453707402000100000017...",
  clean: cleanStringInput,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  comments: "When true, fetches all pages of results using pagination.",
  required: false,
  clean: util.types.toBool,
});

export const odataParams = {
  $filter,
  $select,
  $expand,
  $orderBy,
  $top,
  $skip,
  $count,
  $search,
  $format,
  $skipToken,
};

export const odataGroupParams = {
  $count,
  $expand,
  $filter,
  $orderBy,
  $search,
  $select,
  $top,
};

export const odataSoftwareUpdatesParams = {
  $select,
  $expand,
  $search,
  $format,
  $skipToken,
};

export const bodyFields = input({
  label: "Body Fields",
  type: "code",
  language: "json",
  comments:
    "Additional JSON properties to include in the request body. These will be merged with other input values.",
  required: false,
  example: JSON.stringify({ customField: "value" }, null, 2),
  clean: cleanBodyInput,
});
