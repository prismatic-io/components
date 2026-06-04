import { input, util } from "@prismatic-io/spectral";
import { toOptionalNumber } from "../util";






export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments:
    "The Salesforce Marketing Cloud OAuth connection (Authorization Code for user context or Client Credentials for server-to-server).",
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

export const page = input({
  label: "Page",
  type: "string",
  required: false,
  comments: "The page number to retrieve (starts at 1).",
  example: "1",
  placeholder: "Enter page number",
  clean: toOptionalNumber,
});

export const pageSize = input({
  label: "Page Size",
  type: "string",
  required: false,
  comments:
    "The maximum number of results returned per page. The allowed maximum depends on the endpoint. A Page value must be provided for this parameter to take effect.",
  example: "50",
  placeholder: "Enter page size",
  clean: toOptionalNumber,
});





export const paginatedListInputs = {
  connection,
  fetchAll,
  pageSize,
  page,
};
