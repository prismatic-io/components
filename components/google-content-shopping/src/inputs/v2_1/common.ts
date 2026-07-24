import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { toOptionalNumber, toOptionalString } from "../../util";
export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Google Content Shopping connection to use.",
});
export const version = input({
  label: "API Version",
  type: "string",
  clean: toOptionalString,
  default: "v2.1",
  comments:
    "The API version to use. This is used to construct the base URL for the request.",
  example: "v2.1",
  placeholder: "Enter API version",
  required: false,
});
export const merchantId = input({
  label: "Merchant ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "The ID of the managing account. If this parameter is not the same as accountId, then this account must be a multi-client account and accountId must be the ID of a sub-account of this account.",
  example: "123456789",
  placeholder: "Enter Merchant ID",
  required: true,
});
export const pageToken = input({
  label: "Page Token",
  type: "string",
  clean: toOptionalString,
  comments:
    "The token returned by the previous request's nextPageToken field. Used to retrieve the next page of results when pagination is required. Leave empty for the first request.",
  example: "CAESBggBIAEoAQ",
  placeholder: "Enter Page Token",
  required: false,
});
export const maxResults = input({
  label: "Max Results",
  type: "string",
  clean: toOptionalNumber,
  comments:
    "The maximum number of accounts to return in the response, used for paging.",
  example: "50",
  placeholder: "Enter Max Results",
  required: false,
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
export const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Controls for paging through large result sets.",
  inputs: { maxResults, pageToken },
});
export const kind = input({
  label: "Kind",
  type: "string",
  clean: util.types.toString,
  comments:
    "Identifies what kind of resource this is. Value: the fixed string 'content#account'.",
  example: "content#account",
  placeholder: "Enter Kind",
  required: true,
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
export const pickupMethod = input({
  label: "Pickup Method",
  type: "string",
  clean: toOptionalString,
  comments: "The pick up option for the item.",
  placeholder: "Select pickup method",
  model: [
    {
      label: "BUY",
      value: "buy",
    },
    {
      label: "RESERVE",
      value: "reserve",
    },
    {
      label: "SHIP TO STORE",
      value: "ship to store",
    },
    {
      label: "NOT SUPPORTED",
      value: "not supported",
    },
  ],
  required: false,
});
export const pickupSla = input({
  label: "Pickup SLA",
  type: "string",
  clean: toOptionalString,
  comments: "Item store pickup timeline.",
  placeholder: "Select pickup SLA",
  model: [
    {
      label: "SAME DAY",
      value: "same day",
    },
    {
      label: "NEXT DAY",
      value: "next day",
    },
    {
      label: "2 DAY",
      value: "2-day",
    },
    {
      label: "3 DAY",
      value: "3-day",
    },
    {
      label: "4 DAY",
      value: "4-day",
    },
    {
      label: "5 DAY",
      value: "5-day",
    },
    {
      label: "6 DAY",
      value: "6-day",
    },
    {
      label: "7 DAY",
      value: "7-day",
    },
    {
      label: "MULTI WEEK",
      value: "multi-week",
    },
  ],
  required: false,
});
