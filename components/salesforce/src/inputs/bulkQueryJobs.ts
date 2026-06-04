import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";
import { connectionInput, version } from "./common";

const query = input({
  label: "Query",
  type: "string",
  required: true,
  placeholder: "Enter SOQL query",
  comments: "The SOQL query to execute against the Salesforce Bulk API.",
  example: "SELECT Id FROM Account",
  clean: util.types.toString,
});

const operation = input({
  label: "Operation",
  type: "string",
  required: true,
  comments:
    "The Salesforce Bulk API operation type. Use 'query' for standard queries and 'queryAll' to include deleted or archived records.",
  model: [
    { label: "Query", value: "query" },
    { label: "Query All", value: "queryAll" },
  ],
  default: "query",
  clean: util.types.toString,
});

export const columnDelimiter = input({
  label: "Column Delimiter",
  type: "string",
  required: false,
  comments:
    "The character delimiter used to separate column values in the bulk query results file.",
  model: [
    { label: "BACKQUOTE", value: "BACKQUOTE" },
    { label: "CARET", value: "CARET" },
    { label: "COMMA", value: "COMMA" },
    { label: "PIPE", value: "PIPE" },
    { label: "SEMICOLON", value: "SEMICOLON" },
    { label: "TAB", value: "TAB" },
    { label: "Empty", value: "" },
  ],
  default: "COMMA",
  clean: cleanStringInput,
});

export const lineEnding = input({
  label: "Line Ending",
  type: "string",
  required: true,
  comments: "The line ending character sequence used in the bulk query results file.",
  model: [
    { label: "LF", value: "LF" },
    { label: "CRLF", value: "CRLF" },
    { label: "Empty", value: "" },
  ],
  default: "LF",
  clean: util.types.toString,
});

const queryJobId = input({
  label: "Query Job ID",
  placeholder: "Enter query job ID",
  type: "string",
  required: true,
  comments:
    "The unique identifier of the bulk query job returned from the Create Bulk Query Job action.",
  example: "750R0000000zlh9IAA",
  clean: util.types.toString,
});

export const locator = input({
  label: "Locator",
  type: "string",
  required: false,
  placeholder: "Enter locator value",
  comments:
    "A string that identifies a specific set of query results. Providing a value for this parameter returns only that set of results.",
  example: "MTAwMDA",
  clean: cleanStringInput,
});

const maxRecords = input({
  label: "Max Records",
  type: "string",
  required: false,
  placeholder: "Enter max records",
  comments:
    "The maximum number of records to retrieve per set of results for the query. The request is still subject to the size limits.",
  example: "100",
  clean: (value: unknown) => util.types.toInt(value, 100),
});

export const isPkChunkingEnabled = input({
  label: "Is PK Chunking Enabled",
  type: "boolean",
  required: false,
  comments:
    "When true, the request only returns information about jobs where PK Chunking is enabled. This only applies to Bulk API (not Bulk API 2.0) jobs.",
  clean: util.types.toBool,
  default: "false",
});

export const jobType = input({
  label: "Job Type",
  type: "string",
  required: false,
  comments: "Gets information only about jobs matching the specified job type.",
  model: [
    { label: "Classic", value: "Classic" },
    { label: "V2Query", value: "V2Query" },
    { label: "V2Ingest", value: "V2Ingest" },
    { label: "Empty", value: "" },
  ],
  default: "",
  clean: cleanStringInput,
});

const concurrencyMode = input({
  label: "Concurrency Mode",
  type: "string",
  required: false,
  comments:
    "For future use. Gets information only about jobs matching the specified concurrency mode.",
  model: [
    { label: "serial", value: "serial" },
    { label: "parallel", value: "parallel" },
    { label: "Empty", value: "" },
  ],
  default: "parallel",
  clean: cleanStringInput,
});

export const createBulkQueryJobInputs = {
  connection: connectionInput,
  version,
  operation,
  query,
  columnDelimiter,
  lineEnding,
};

export const abortBulkQueryJobInputs = {
  connection: connectionInput,
  version,
  queryJobId: {
    ...queryJobId,
    comments: "The ID of the query job to abort",
  },
};

export const deleteBulkQueryJobInputs = {
  connection: connectionInput,
  version,
  queryJobId: {
    ...queryJobId,
    comments: "The ID of the query job to delete",
  },
};

export const getQueryJobInformationInputs = {
  connection: connectionInput,
  version,
  queryJobId,
};

export const getAllQueryJobInformationInputs = {
  connection: connectionInput,
  version,
  isPkChunkingEnabled,
  jobType,
  concurrencyMode,
  queryLocator: { ...locator, label: "Query Locator" },
};

export const getQueryJobResultsInputs = {
  connection: connectionInput,
  version,
  queryJobId,
  locator,
  maxRecords,
};
