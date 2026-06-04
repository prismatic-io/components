import { input, util } from "@prismatic-io/spectral";
import { cleanKeyValPair, cleanNumber, cleanString } from "../util";


export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The ADP Workforce Now connection to use.",
});


export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  comments:
    "When true, fetches all records using pagination and ignores parameters like $skip and $top.",
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
    "The OData $count parameter MUST be used to specify the total number criterion. This parameter can't be used with $top or $skip.",
  clean: cleanString,
});

export const $filter = input({
  label: "Filter",
  type: "string",
  required: false,
  comments:
    "Specifies an expression that an item must match to be included in a response. Various criteria could be combined using and/or operands and () to set the operand precedence. e.g. /mobileUserAccounts/associateOID eq 'G4O73G9Z62SL2NFM'",
  placeholder: "/mobileUserAccounts/associateOID eq 'G4O73G9Z62SL2NFM'",
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
  clean: cleanKeyValPair,
});


export const paginationInputs = { fetchAll };
export const odataQueryInputs = {
  $count,
  $filter,
  $select,
  $skip,
  $top,
  $expand,
};
