import { input, util } from "@prismatic-io/spectral";
import {
  cleanCodeInput,
  cleanKeyValueListInput,
  toOptionalString,
} from "../util";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const additionalInputs = input({
  label: "Additional Inputs",
  type: "code",
  language: "json",
  required: false,
  comments:
    "The additional fields to send in the request body, as a JSON object.",
  example: JSON.stringify({}, null, 2),
  clean: cleanCodeInput,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  comments:
    "When true, automatically fetches all pages of results. When false, the other inputs control which records are returned.",
  clean: util.types.toBool,
});

export const customQueryParams = input({
  label: "Custom Query Params",
  type: "string",
  collection: "keyvaluelist",
  example: "key1=value1",
  required: false,
  comments: "The additional query string parameters to append to the request.",
  placeholder: "Enter a query parameter key and value",
  clean: cleanKeyValueListInput,
});

export const $top = input({
  label: "Top",
  type: "string",
  required: false,
  comments: "The maximum number of records to return.",
  placeholder: "Enter the number of records to return",
  example: "20",
  clean: toOptionalString,
});

export const $skip = input({
  label: "Skip",
  type: "string",
  required: false,
  comments: "The number of records to skip before returning results.",
  placeholder: "Enter the number of records to skip",
  example: "20",
  clean: toOptionalString,
});

export const $search = input({
  label: "Search",
  type: "string",
  required: false,
  comments: "The search phrase used to filter the returned items.",
  placeholder: "Enter a search phrase",
  example: "NOT clothing",
  clean: toOptionalString,
});

export const $filter = input({
  label: "Filter",
  type: "string",
  required: false,
  comments:
    "The OData filter expression used to narrow results by property values.",
  placeholder: "Enter an OData filter expression",
  example: "Price lt 10.00",
  clean: toOptionalString,
});

export const $orderby = input({
  label: "Order By",
  type: "string",
  required: false,
  comments: "The property and direction used to sort the returned items.",
  placeholder: "Enter a property and sort direction",
  example: "userId desc",
  clean: toOptionalString,
});

export const $count = input({
  label: "Count",
  type: "boolean",
  required: false,
  comments:
    "When true, includes a count of the matching items in the response.",
  clean: util.types.toBool,
});

export const $select = input({
  label: "Select",
  type: "string",
  required: false,
  comments:
    "The comma-separated list of properties to include in the response.",
  placeholder: "Enter properties to return",
  example: "Rating,ReleaseDate",
  clean: toOptionalString,
});

export const $expand = input({
  label: "Expand",
  type: "string",
  required: false,
  comments: "The related entities to expand and include in the response.",
  placeholder: "Enter related entities to expand",
  example: "Orders($filter=Amount gt 100)",
  clean: toOptionalString,
});

export const defaultListInputs = {
  connection,
  fetchAll,
  $top,
  $skip,
  $search,
  $select,
  $filter,
  $count,
  $orderby,
  $expand,
  customQueryParams,
};
