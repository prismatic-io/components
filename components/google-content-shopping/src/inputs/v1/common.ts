import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { toOptionalNumber, toOptionalString } from "../../util";
export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Google Content Shopping connection to use.",
});
export const account = input({
  label: "Account",
  type: "string",
  clean: util.types.toString,
  comments:
    "The Merchant Center account. Accepts a numeric account ID (e.g. 123456789) or a full resource name (e.g. accounts/123456789).",
  example: "123456789",
  placeholder: "Enter Account ID",
  required: true,
  dataSource: "selectAccountMerchant",
});
const pageSize = input({
  label: "Page Size",
  type: "string",
  clean: toOptionalNumber,
  comments:
    "The maximum number of results to return per page. Ignored when Fetch All is enabled.",
  example: "50",
  placeholder: "Enter Page Size",
  required: false,
});
const pageToken = input({
  label: "Page Token",
  type: "string",
  clean: toOptionalString,
  comments:
    "The token returned by the previous request's nextPageToken field. Used to retrieve the next page of results when pagination is required. Leave empty for the first request.",
  example: "CAESBggBIAEoAQ",
  placeholder: "Enter Page Token",
  required: false,
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
export const updateMask = input({
  label: "Update Mask",
  type: "string",
  clean: toOptionalString,
  comments:
    "Comma-separated list of product attributes to update. Attributes in the mask without values will be deleted. Only top-level attributes can be updated.",
  example: "title,salePrice",
  placeholder: "Enter Field Names (Comma-Separated)",
  required: false,
});
export const connectionOnlyInputs = {
  connectionInput,
};
export const paginationInputs = {
  fetchAll,
  pageSize,
  pageToken,
};
export const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Cursor and page-size controls for paging through results.",
  inputs: { pageSize, pageToken },
});
export const paginationGroupedInputs = {
  fetchAll,
  pagination,
};
