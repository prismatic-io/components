import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanKeyValPair, cleanNumber, cleanString } from "../util";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The ADP Workforce Now connection to use.",
});

export const aoid = input({
  label: "Associate OID",
  type: "string",
  required: true,
  comments: "The unique Associate OID identifier of the worker.",
  placeholder: "Enter Associate OID",
  example: "G3STHDEHFMJ3BY3N",
  clean: cleanString,
  dataSource: "selectWorker",
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, automatically fetches all pages of results using pagination. Ignores $skip and $top.",
  clean: util.types.toBool,
});

export const $count = input({
  label: "Count",
  type: "string",
  model: [
    {
      label: "True",
      value: "true",
    },
    {
      label: "False",
      value: "false",
    },
  ],
  required: false,
  default: "",
  comments:
    "When true, the response includes the total number of records matching the query. Cannot be combined with $top or $skip.",
  clean: cleanString,
});

export const $filter = input({
  label: "Filter",
  type: "string",
  required: false,
  comments:
    "Specifies an expression that an item must match to be included in a response. Various criteria could be combined using and/or operands and () to set the operand precedence. e.g. /mobileUserAccounts/associateOID eq 'G4O73G9Z62SL2NFM'",
  placeholder: "Enter filter expression",
  example: "/mobileUserAccounts/associateOID eq 'G4O73G9Z62SL2NFM'",
  clean: cleanString,
});

export const $select = input({
  label: "Select",
  type: "string",
  required: false,
  comments:
    "Comma-separated list of properties to include in the response using OData property paths.",
  placeholder: "Enter property paths",
  example: "/mobileUserAccounts/associateOID,/mobileUserAccounts/governmentID",
  clean: cleanString,
});

export const $skip = input({
  label: "Skip",
  type: "string",
  required: false,
  comments:
    "The number of items to skip from the beginning of the list for pagination.",
  placeholder: "Enter number to skip",
  example: "20",
  clean: cleanNumber,
});

export const $top = input({
  label: "Top",
  type: "string",
  required: false,
  comments: "The maximum number of items to return in the response.",
  placeholder: "Enter maximum number",
  example: "10",
  clean: cleanNumber,
});

export const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page-size and offset controls for paging through results.",
  inputs: {
    $skip,
    $top,
  },
});

export const $expand = input({
  label: "Expand",
  type: "string",
  required: false,
  comments:
    "The related resources to include inline in the response using OData expand syntax.",
  placeholder: "Enter related resource path",
  example: "dayEntries",
  clean: cleanString,
});

export const queryParams = input({
  label: "Query Parameters",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments:
    "The query parameters that will be appended to the URL. The parameters should be in key-value pairs.",
  placeholder: "Enter query parameters",
  clean: cleanKeyValPair,
});
