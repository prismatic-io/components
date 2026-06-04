import { input, type KeyValuePair, util } from "@prismatic-io/spectral";
import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { cleanNumber, cleanString } from "../util";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;





export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "Select your UKG Pro connection.",
});





export const page = input({
  label: "Page",
  type: "string",
  required: false,
  comments: "The page number to retrieve (1-indexed). Defaults to 1.",
  placeholder: "Enter page number",
  example: "1",
  clean: cleanNumber,
});

export const perPage = input({
  label: "Per Page",
  type: "string",
  required: false,
  comments: "Number of records to return per page. Defaults to API default (usually 100).",
  placeholder: "Enter number of records per page",
  example: "100",
  clean: cleanNumber,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, automatically fetches all pages of results using pagination.",
  clean: util.types.toBool,
});





export const startDate = input({
  label: "Start Date",
  type: "string",
  required: false,
  comments: "Start date for filtering results. Format: YYYY-MM-DD",
  placeholder: "Enter start date (YYYY-MM-DD)",
  example: "2024-01-01",
  clean: cleanString,
});

export const endDate = input({
  label: "End Date",
  type: "string",
  required: false,
  comments: "End date for filtering results. Format: YYYY-MM-DD",
  placeholder: "Enter end date (YYYY-MM-DD)",
  example: "2024-12-31",
  clean: cleanString,
});

export const lastCheckDate = input({
  label: "Last Check Date",
  type: "string",
  required: true,
  comments:
    "The date/time to check for changes since. Must be at least 3 hours ago. Format: ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)",
  placeholder: "Enter date/time (YYYY-MM-DDTHH:mm:ssZ)",
  example: "2024-01-15T10:00:00Z",
  clean: util.types.toString,
});

export const filterParameters = input({
  label: "Filter Parameters",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments: "Additional filter parameters as key-value pairs.",
  example: "status=active,type=full-time",
  placeholder: "Enter filter parameters",
  clean: (value: unknown) => {
    return util.types.keyValPairListToObject(value as KeyValuePair[]);
  },
});





export const paginationInputs = {
  page,
  perPage,
  fetchAll,
};

export const dateRangeInputs = {
  startDate,
  endDate,
};

export const rawRequestActionInputs = {
  connection: connectionInput,
  ...rawRequestInputs,
  url: {
    ...rawRequestInputs.url,
    comments:
      "Input the path only (/personnel/v1/employee-changes). The base URL is already included from the connection. For example, to call the employee changes endpoint, enter `/personnel/v1/employee-changes`.",
    example: "/personnel/v1/employee-changes",
  },
};
