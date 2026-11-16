import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { startCase } from "lodash";
import { recordTypes } from "../constants";
import {
  recordIdClean,
  recordTypeClean,
  toCommaSeparatedList,
  toOptionalString,
} from "../utils";
import { connectionInput, limitInput, offsetInput } from "./common";

export const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page and page-size controls.",
  inputs: { limit: limitInput, offset: offsetInput },
});

export const recordTypeInput = input({
  label: "Record Type",
  type: "string",
  required: true,
  placeholder: "Select record type",
  model: recordTypes.map((key) => ({
    label:
      key === "nonInventorySaleItem"
        ? "Non-Inventory Sale Item"
        : startCase(key),
    value: key,
  })),
  clean: recordTypeClean,
  comments:
    "Record type to perform the action against. Also accepts the script ID of a custom record or custom transaction type, such as customrecord_milestone.",
});

const recordIdInput = input({
  label: "Record ID",
  type: "string",
  required: true,
  comments:
    "The internal ID of the record. For external IDs, use the format 'eid:YOUR_EXTERNAL_ID'. See [Getting a Record Instance](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1545141500.html) for details.",
  example: "107",
  placeholder: "Enter record ID",
  clean: recordIdClean,
});

const payloadInput = input({
  label: "Payload",
  type: "code",
  language: "json",
  required: true,
  comments:
    "Data payload to send in the action request. See [REST API Browser](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_157373386674.html) for details.",
  placeholder: "Enter JSON payload",
  clean: util.types.toObject,
  default: JSON.stringify(
    {
      entityid: "New Customer",
      companyname: "My Company",
      subsidiary: { id: "1" },
    },
    null,
    2,
  ),
});

export const queryInput = input({
  label: "Query",
  type: "string",
  required: false,
  example: "email START_WITH barbara",
  placeholder: "Enter filter query",
  comments:
    "Query string to filter records. Use operators like START_WITH, EQUAL, CONTAIN. See [Record Collection Filtering](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1545222128.html) for details.",
  clean: toOptionalString,
});

export const recordFieldInput = input({
  label: "Record Field",
  type: "string",
  required: false,
  example: "email",
  placeholder: "Enter field name",
  comments:
    "The record field to use as the label for the picklist. If unspecified, the record ID is used.",
  clean: toOptionalString,
});

const expandSubResources = input({
  label: "Expand Sub-Resources",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, automatically expands all sublists, sublist lines, and subrecords on this record.",
  clean: util.types.toBool,
});

const simpleEnumFormat = input({
  label: "Simple Enum Format",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, returns enumeration values in a format that only shows the internal ID value.",
  clean: util.types.toBool,
});

const fields = input({
  label: "Fields to Return",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Specific fields and sublists to return in the request. If unspecified, the full record is returned.",
  example: '["email", "companyname", "subsidiary"]',
  placeholder: "Enter field name",
  clean: toCommaSeparatedList,
});

const replace = input({
  label: "Replace",
  type: "string",
  required: false,
  collection: "valuelist",
  comments:
    "Names of sublists on this record. All specified sublists will be replaced instead of added to.",
  example: '["itemList", "addressbookList"]',
  placeholder: "Enter sublist name",
  clean: toCommaSeparatedList,
});

const replaceSelectedFields = input({
  label: "Replace Selected Fields",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, deletes all fields, including body fields, specified in the Replace input.",
  clean: util.types.toBool,
});

export const listRecordInputs = {
  connection: connectionInput,
  recordType: recordTypeInput,
  query: queryInput,
  pagination,
};

export const getRecordInputs = {
  connection: connectionInput,
  recordType: recordTypeInput,
  id: recordIdInput,
  expandSubResources,
  simpleEnumFormat,
  fields,
};

export const createRecordInputs = {
  connection: connectionInput,
  recordType: recordTypeInput,
  payload: payloadInput,
};

export const updateRecordInputs = {
  connection: connectionInput,
  recordType: recordTypeInput,
  id: recordIdInput,
  payload: payloadInput,
  replace,
  replaceSelectedFields,
};

export const deleteRecordInputs = {
  connection: connectionInput,
  recordType: recordTypeInput,
  id: recordIdInput,
};
