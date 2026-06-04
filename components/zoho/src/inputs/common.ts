import { input, util } from "@prismatic-io/spectral";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PER_PAGE } from "../constants";
import { cleanKeyValList, toOptionalString } from "../util/general";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Zoho connection to use.",
});

export const recordId = input({
  label: "Record ID",
  placeholder: "Enter Record ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the record in Zoho.",
  clean: util.types.toString,
  example: "5394166000000379001",
});

export const page = input({
  label: "Page",
  placeholder: "Enter page number",
  type: "string",
  required: false,
  comments: "The page number to start at. First page is 1.",
  clean: util.types.toNumber,
  example: "1",
  default: DEFAULT_PAGE_NUMBER.toString(),
});

export const per_page = input({
  label: "Per Page",
  placeholder: "Enter number of records per page",
  default: DEFAULT_PER_PAGE.toString(),
  type: "string",
  required: false,
  comments: "The number of records to fetch per page. Maximum is 200.",
  clean: util.types.toNumber,
  example: "200",
});

export const page_token = input({
  label: "Page Token",
  placeholder: "Enter page token",
  type: "string",
  required: false,
  comments:
    "Cursor token for pagination. Use the value from the previous response to retrieve the next page of results.",
  clean: toOptionalString,
  example: "187d2af1e9c50119e",
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, automatically fetches all pages of results using pagination.",
  clean: util.types.toBool,
});

export const dynamicValues = input({
  label: "Dynamic Fields",
  type: "data",
  required: false,
  comments:
    "Dynamic input fields that can be configured at deploy time using key-value config variables.",
});

export const fieldValues = input({
  label: "Values",
  placeholder: "Enter field key-value pairs",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments:
    "Key-value pairs representing field names and their values for creating or updating records.",
  example: JSON.stringify({ Last_Name: "Doe", Email: "john.doe@example.com" }, null, 2),
  clean: cleanKeyValList,
});

export const leadsPollingTriggerInputs = {
  connection: connectionInput,
};
