import { input, util } from "@prismatic-io/spectral";
import { cleanCodeInput, cleanKeyValueListInput, toOptionalString } from "../util";

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
  comments: "Additional inputs to be passed to the action",
  example: JSON.stringify({}, null, 2),
  clean: cleanCodeInput,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  comments:
    "If true will fetch all records, otherwise will use the other inputs to fetch the records",
  clean: util.types.toBool,
});

export const customQueryParams = input({
  label: "Custom Query Params",
  type: "string",
  collection: "keyvaluelist",
  example: "key1=value1",
  required: false,
  comments: "Custom fields filter",
  placeholder: "key1=value1",
  clean: cleanKeyValueListInput,
});

export const $top = input({
  label: "Top",
  type: "string",
  required: false,
  comments: "The number of records to return",
  placeholder: "20",
  example: "20",
  clean: toOptionalString,
});

export const $skip = input({
  label: "Skip",
  type: "string",
  required: false,
  comments: "The number of records to skip",
  placeholder: "20",
  example: "20",
  clean: toOptionalString,
});

export const $search = input({
  label: "Search",
  type: "string",
  required: false,
  comments: "Search items by search phrases",
  placeholder: "NOT clothing",
  example: "NOT clothing",
  clean: toOptionalString,
});

export const $filter = input({
  label: "Filter",
  type: "string",
  required: false,
  comments: "Filter items by property values",
  placeholder: "Price lt 10.00",
  example: "Price lt 10.00",
  clean: toOptionalString,
});

export const $orderby = input({
  label: "Order By",
  type: "string",
  required: false,
  comments: "Order items by property values",
  placeholder: "userId desc",
  example: "userId desc",
  clean: toOptionalString,
});

export const $count = input({
  label: "Count",
  type: "boolean",
  required: false,
  comments: "Include count of items",
  clean: util.types.toBool,
});

export const $select = input({
  label: "Select",
  type: "string",
  required: false,
  comments: "Select properties to be returned",
  placeholder: "Rating,ReleaseDate",
  example: "Rating,ReleaseDate",
  clean: toOptionalString,
});

export const $expand = input({
  label: "Expand",
  type: "string",
  required: false,
  comments: "Expand related entities",
  placeholder: "Orders($filter=Amount gt 100)",
  example: "Orders($filter=Amount gt 100)",
  clean: toOptionalString,
});

export const defaultListInputs = {
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
  connection,
};
