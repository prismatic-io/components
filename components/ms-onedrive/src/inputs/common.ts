import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { toOptionalNumber, toOptionalString } from "../util/clean";

export const oneDriveConnection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Microsoft OneDrive connection to use.",
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, automatically fetches all pages of results by following @odata.nextLink. Page Limit and Page Token inputs are ignored when this is enabled.",
  required: false,
  default: "false",
});

const pageLimit = input({
  label: "Page Limit",
  type: "string",
  required: false,
  example: "100",
  placeholder: "Enter page size",
  comments: "The maximum number of results to return per page.",
  clean: toOptionalNumber,
});

const pageToken = input({
  label: "Page Token",
  type: "string",
  required: false,
  example: "X%2744537079ghv",
  placeholder: "Enter page token",
  comments:
    "The $skiptoken value from the @odata.nextLink of a previous response, used to retrieve the next page of results.",
  clean: toOptionalString,
});

export const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page-size and page-token controls for paging through results.",
  inputs: {
    pageLimit,
    pageToken,
  },
});
