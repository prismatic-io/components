import { input, util } from "@prismatic-io/spectral";
import { toOptionalNumber, toOptionalString } from "../util";
export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Qualys connection to use.",
});
export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, automatically fetches all pages of results.",
  clean: util.types.toBool,
});
export const pageSize = input({
  label: "Page Size",
  type: "string",
  required: false,
  comments:
    "The maximum number of results to return per page. The API default applies when omitted.",
  clean: toOptionalNumber,
  placeholder: "Enter page size",
  example: "100",
});
export const cursor = input({
  label: "Last ID",
  type: "string",
  required: false,
  comments:
    "Start results after this asset ID (keyset cursor). Returned in the previous response when more results are available.",
  clean: toOptionalString,
  placeholder: "Enter last asset ID from previous page",
  example: "12345",
});
