import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";
export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The ServiceNow connection to use.",
});
export const instanceUrlInput = input({
  label: "Instance URL",
  placeholder: "Enter the instance URL",
  type: "string",
  required: true,
  comments:
    "The URL of the specific ServiceNow instance to use for API requests",
  example: "https://instance.service-now.com",
  clean: util.types.toString,
});
export const apiVersionInput = input({
  label: "API Version",
  placeholder: "Enter the API version",
  type: "string",
  required: true,
  comments: "The version of the ServiceNow API to use",
  model: [
    { label: "Latest", value: "latest" },
    { label: "v2", value: "v2" },
    { label: "v1", value: "v1" },
  ],
  example: "v2",
  clean: util.types.toString,
});
export const tableNameInput = input({
  label: "Table",
  placeholder: "Enter the table name",
  type: "string",
  required: true,
  comments: "The name of the ServiceNow table in which to create a record",
  example: "incident",
  clean: util.types.toString,
  dataSource: "selectTable",
});
export const fieldValuesInput = input({
  label: "Values",
  placeholder: "Enter the field values",
  type: "string",
  collection: "keyvaluelist",
  required: true,
  comments:
    "The names of the fields and their values to use when creating a record",
});
export const fieldValuesInputNonRequired = input({
  label: "Values",
  placeholder: "Enter the field values",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments:
    "The names of the fields and their values to use when creating a record",
});
export const sysId = input({
  label: "Sys ID",
  type: "string",
  required: true,
  comments: "The Sys ID of the record being queried",
  clean: util.types.toString,
  example: "d71f7935c0a8016700802b64c67c11c6",
  placeholder: "Enter the Sys ID",
  dataSource: "selectAttachment",
});
export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When enabled, automatically fetches all pages of results. The offset/limit inputs are ignored when this is enabled.",
  required: false,
  default: "false",
});
export const sysparmFields = input({
  label: "Sysparm Fields",
  type: "string",
  required: false,
  example: "sys_id,label",
  placeholder: "Enter the sysparm fields",
  comments:
    "Comma-separated list of fields to return. If not specified, all fields are returned.",
  clean: cleanStringInput,
});
export const sysparmLimit = input({
  label: "Sysparm Limit",
  type: "string",
  required: false,
  example: "100",
  placeholder: "Enter the sysparm limit",
  comments:
    "Max number of records to return. Large values can impact performance. For pagination with large data sets include the Sysparm Offset",
  clean: cleanStringInput,
});
export const sysparmOffset = input({
  label: "Sysparm Offset",
  type: "string",
  example: "0",
  placeholder: "Enter the sysparm offset",
  required: false,
  comments:
    "Starting record index for which to begin retrieving records. This functionality enables the retrieval of all records, regardless of the number of records, in small manageable chunks. For example, the first time you call this endpoint, sysparm_offset is set to '0'. To simply page through all available records, use sysparm_offset=sysparm_offset+sysparm_limit, until you reach the end of all records.",
  clean: cleanStringInput,
});
export const sysparmQuery = input({
  label: "Sysparm Query",
  type: "string",
  required: false,
  comments:
    "Encoded query used to filter the result set. Syntax: sysparm_query=<col_name><operator><value>.",
  example: "active=true^ORDERBYnumber^ORDERBYDESCcategory",
  placeholder: "Enter the encoded query",
  clean: cleanStringInput,
});
export const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page size and offset for paginated retrieval.",
  inputs: { sysparmLimit, sysparmOffset },
});
export const file = input({
  label: "File",
  type: "string",
  required: true,
  comments: "The file to attach to the record.",
  placeholder: "Enter the file data",
  clean: util.types.toData,
});
export const fileName = input({
  label: "File Name",
  type: "string",
  required: true,
  comments: "Name to give the attachment.",
  example: "issue_screenshot",
  placeholder: "Enter the file name",
  clean: util.types.toString,
});
export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When enabled, newly created records will be included in the trigger output.",
  clean: util.types.toBool,
});
export const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When enabled, records that were updated after the last poll will be included in the trigger output.",
  clean: util.types.toBool,
});
