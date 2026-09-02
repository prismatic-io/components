import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../utils";
export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When enabled, automatically fetches all pages of results by following @odata.nextLink. Page Size, Skip, and Skip Token inputs are ignored when this is enabled.",
  required: false,
  default: "false",
});
export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Microsoft Business Central connection to use.",
});
export const odataParams = {
  $filter: input({
    label: "Filter",
    type: "string",
    comments: "Filters results (rows).",
    required: false,
    placeholder: "Enter filter expression",
    example: "startswith(givenName,'J')",
    default: "",
    clean: cleanStringInput,
  }),
  $select: input({
    label: "Select",
    type: "string",
    comments: "Filters properties (columns).",
    required: false,
    placeholder: "Enter fields to select",
    example: "givenName,surname",
    clean: cleanStringInput,
  }),
  $expand: input({
    label: "Expand",
    type: "string",
    comments: "Retrieves related resources.",
    required: false,
    placeholder: "Enter fields to expand",
    example: "members",
    clean: cleanStringInput,
  }),
  $orderBy: input({
    label: "Order By",
    type: "string",
    comments: "Orders results.",
    required: false,
    placeholder: "Enter order by expression",
    example: "displayName desc",
    clean: cleanStringInput,
  }),
  $top: input({
    label: "Top",
    type: "string",
    comments: "Sets the page size of results.",
    required: false,
    placeholder: "Enter page size",
    example: "10",
    clean: cleanStringInput,
  }),
  $skip: input({
    label: "Skip",
    type: "string",
    comments:
      "Indexes into a result set. Also used by some APIs to implement paging and can be used together with $top to manually page results.",
    required: false,
    placeholder: "Enter number to skip",
    example: "10",
    clean: cleanStringInput,
  }),
  $count: input({
    label: "Count",
    type: "boolean",
    comments: "When true, retrieves the total count of matching resources.",
    required: false,
    default: "false",
    clean: util.types.toBool,
  }),
  $search: input({
    label: "Search",
    type: "string",
    comments: "Returns results based on search criteria.",
    required: false,
    placeholder: "Enter search terms",
    example: "pizza",
    clean: cleanStringInput,
  }),
  $format: input({
    label: "Format",
    type: "string",
    comments: "Returns the results in the specified media format.",
    required: false,
    placeholder: "Enter format",
    example: "json",
    clean: cleanStringInput,
  }),
  $skipToken: input({
    label: "Skip Token",
    type: "string",
    comments:
      "Retrieves the next page of results from result sets that span multiple pages.",
    required: false,
    placeholder: "Enter skip token",
    example: "X%274453707402000100000017...",
    clean: cleanStringInput,
  }),
};
export const odataQueryParams = structuredObjectInput({
  label: "OData Query Parameters",
  required: false,
  comments:
    "OData system query options for filtering, sorting, selecting, and expanding results.",
  inputs: {
    $filter: odataParams.$filter,
    $select: odataParams.$select,
    $expand: odataParams.$expand,
    $orderBy: odataParams.$orderBy,
    $top: odataParams.$top,
    $skip: odataParams.$skip,
    $count: odataParams.$count,
    $search: odataParams.$search,
    $format: odataParams.$format,
    $skipToken: odataParams.$skipToken,
  },
});
export const additionalProperties = input({
  label: "Additional Properties",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Additional properties to include in the request body. " +
    "In case of supplying a property that is already defined as an input, " +
    "the input value will be used.",
  clean: util.types.toObject,
  example: JSON.stringify({
    customProperty: "customValue",
  }),
});
