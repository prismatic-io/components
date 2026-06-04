import { input, util } from "@prismatic-io/spectral";
import { cleanString, jsonInputClean } from "../util";
import {
  connectionInput,
  datasetId,
  kind,
  maxResults,
  pageToken,
  projectId,
  selectedFields,
  startIndex,
  tableId,
} from "./common";

export const skipInvalidRows = input({
  label: "Skip Invalid Rows",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, inserts all valid rows of a request even if invalid rows exist. Default is false, which causes the entire request to fail if any invalid rows exist.",
  required: false,
});

export const ignoreUnknownValues = input({
  label: "Ignore Unknown Values",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, accepts rows that contain values that do not match the schema. The unknown values are ignored. Default is false, which treats unknown values as errors.",
  required: false,
});

export const templateSuffix = input({
  label: "Template Suffix",
  type: "string",
  clean: cleanString,
  comments:
    "Optional. If specified, treats the destination table as a base template, and inserts the rows into an instance table named '{destination}{templateSuffix}'. BigQuery will manage creation of the instance table, using the schema of the base template table. \nSee https://cloud.google.com/bigquery/streaming-data-into-bigquery#template-tables for considerations when working with templates tables.",
  example: "_20240101",
  placeholder: "Enter template suffix",
  required: false,
});

export const traceId = input({
  label: "Trace ID",
  type: "string",
  clean: cleanString,
  comments:
    "Unique request trace ID. Used for debugging purposes only. It is case-sensitive, limited to up to 36 ASCII characters. A UUID is recommended.",
  example: "550e8400-e29b-41d4-a716-446655440000",
  placeholder: "Enter trace ID",
  required: false,
});

export const rows = input({
  label: "Rows",
  type: "code",
  language: "json",
  comments:
    "The complete policy to be applied to the resource. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them.",
  example: JSON.stringify([
    {
      insertId: "string",
      json: "follow this structure: https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Struct",
    },
  ]),
  clean: jsonInputClean,
  required: false,
});


export const listTableDataInputs = {
  connectionInput,
  datasetId,
  projectId,
  tableId,
  startIndex,
  maxResults,
  pageToken,
  selectedFields,
};

export const tableDataInsertAllInputs = {
  connectionInput,
  datasetId,
  projectId,
  tableId,
  kind,
  skipInvalidRows,
  ignoreUnknownValues,
  templateSuffix,
  rows,
};
