import { input, util } from "@prismatic-io/spectral";
import { startCase } from "lodash";
import { recordTypes } from "../constants";
import type { RecordType } from "../types/RecordType";
import { connectionInput, limitInput, offsetInput } from "./common";

const recordTypeInput = input({
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
  clean: (rawValue) => {
    const value = util.types.toString(rawValue) as RecordType;
    if (!recordTypes.includes(value)) {
      throw new Error(`Unexpected Record Type: ${value}`);
    }
    return value;
  },
  comments: "Record type to perform the action against.",
});

const recordIdInput = input({
  label: "Record ID",
  type: "string",
  required: true,
  comments:
    "The internal ID of the record. For external IDs, use the format 'eid:YOUR_EXTERNAL_ID'. See [Getting a Record Instance](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1545141500.html) for details.",
  example: "107",
  placeholder: "Enter record ID",
  clean: util.types.toNumber,
});

const payloadInput = input({
  label: "Payload",
  type: "code",
  language: "json",
  required: true,
  comments:
    "Data payload to send in the action request. See [REST API Browser](https://system.netsuite.com/help/helpcenter/en_US/APIs/REST_API_Browser/record/v1/2024.1/index.html) for details.",
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

const queryInput = input({
  label: "Query",
  type: "string",
  required: false,
  example: "email START_WITH barbara",
  placeholder: "Enter filter query",
  comments:
    "Query string to filter records. Use operators like START_WITH, EQUAL, CONTAIN. See [Record Collection Filtering](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1545222128.html) for details.",
  clean: util.types.toString,
});

const recordFieldInput = input({
  label: "Record Field",
  type: "string",
  required: false,
  example: "email",
  placeholder: "Enter field name",
  comments:
    "The record field to use as the label for the picklist. If unspecified, the record ID is used.",
  clean: util.types.toString,
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
  placeholder: "Select fields to return",
  clean: (rawValue) => {
    if (!Array.isArray(rawValue)) {
      return rawValue;
    }
    const values = rawValue.map((v) => util.types.toString(v));
    return values.join(",");
  },
});

const replace = input({
  label: "Replace",
  type: "string",
  required: false,
  collection: "valuelist",
  comments:
    "Names of sublists on this record. All specified sublists will be replaced instead of added to.",
  example: '["itemList", "addressbookList"]',
  placeholder: "Select sublists to replace",
  clean: (rawValue) => {
    if (!Array.isArray(rawValue)) {
      return rawValue;
    }
    const values = rawValue.map((v) => util.types.toString(v));
    return values.join(",");
  },
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



const showNewRecordsInput = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, includes new records in the results.",
  clean: util.types.toBool,
});

const showUpdatedRecordsInput = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, includes updated records in the results.",
  clean: util.types.toBool,
});

const additionalFilterInput = input({
  label: "Additional Filter",
  type: "string",
  required: false,
  comments:
    "Additional WHERE clause conditions to append to the polling query. Do not include 'AND' prefix - it will be added automatically. See [Record Collection Filtering](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1545222128.html) for query syntax.",
  example: "isinactive = 'F'",
  placeholder: "Enter additional filter conditions",
  clean: util.types.toString,
});





export const listRecordInputs = {
  connection: connectionInput,
  recordType: recordTypeInput,
  query: queryInput,
  limit: limitInput,
  offset: offsetInput,
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

export const selectRecordInputs = {
  connection: connectionInput,
  recordType: recordTypeInput,
  recordField: recordFieldInput,
  query: queryInput,
  limit: limitInput,
  offset: offsetInput,
};

export const pollRecordsInputs = {
  showNewRecords: showNewRecordsInput,
  showUpdatedRecords: showUpdatedRecordsInput,
  connection: connectionInput,
  recordType: recordTypeInput,
  additionalFilter: additionalFilterInput,
};
