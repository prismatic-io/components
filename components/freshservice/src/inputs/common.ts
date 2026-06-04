import { input, type KeyValuePair, util } from "@prismatic-io/spectral";
import { cleanCodeInput, cleanNumberInput } from "../util";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Freshservice connection to use.",
});

export const additionalFields = input({
  label: "Additional Fields",
  type: "code",
  language: "json",
  required: false,
  comments:
    "A JSON object of additional fields not covered by the standard inputs.",
  clean: (value) => cleanCodeInput(value, "Additional Fields", true),
});

export const perPage = input({
  label: "Items Per Page",
  type: "string",
  required: false,
  comments: "The maximum number of results to return per page. Maximum is 100.",
  example: "10",
  placeholder: "Enter page size",
  clean: cleanNumberInput,
});

export const page = input({
  label: "Page Number",
  type: "string",
  required: false,
  comments: "The 1-based page number to return.",
  example: "2",
  placeholder: "Enter page number",
  clean: cleanNumberInput,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  comments: "When true, automatically fetches all pages of results.",
  default: "false",
  clean: util.types.toBool,
});

export const additionalQueryParams = input({
  label: "Additional Query Parameters",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments:
    "Key-value pairs appended to the request URL for filtering or other API options.",
  clean: (value) => util.types.keyValPairListToObject(value as KeyValuePair[]),
});
