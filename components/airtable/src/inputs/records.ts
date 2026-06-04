import { type KeyValuePair, input, util } from "@prismatic-io/spectral";
import { cleanDynamicValues } from "../util";
import { baseIdInput, connectionInput, tableName } from "./common";

const recordIdInput = input({
  label: "Record ID",
  type: "string",
  required: true,
  example: "rec6r4kNmGDk5D52F",
  placeholder: "Enter record ID",
  comments:
    "The unique identifier for the record. Functions as the primary key for the row in the table.",
  dataSource: "selectRecord",
  clean: util.types.toString,
});

const recordFields = input({
  label: "Record Fields",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  placeholder: "Add field key-value pairs",
  comments:
    "The key-value pairs to set on the record. Each key maps to a column name in the table.",
  clean: (values: unknown): Record<string, string> =>
    util.types.keyValPairListToObject(values as KeyValuePair<unknown>[]),
});

const dynamicFields = input({
  label: "Dynamic Fields",
  type: "code",
  language: "json",
  required: false,
  comments:
    "A JSON array of key-value pairs that can be configured at deploy time with a key-value config variable. When provided, the default 'Record Fields' input is ignored.",
  example: JSON.stringify(
    [
      { key: "name", value: "My Example Account" },
      { key: "phone", value: "5551234567" },
    ],
    null,
    2,
  ),
  clean: cleanDynamicValues,
});

const view = input({
  label: "View",
  type: "string",
  example: "Grid view",
  placeholder: "Enter view name or ID",
  required: false,
  comments:
    "The name or ID of a view in the table. When set, only records in that view are returned, sorted in the order defined by the view.",
  clean: (value) => util.types.toString(value) || undefined,
});

const fields = input({
  label: "Fields",
  type: "string",
  example: "Name, Email, Status",
  placeholder: "Enter field names",
  required: false,
  collection: "valuelist",
  comments:
    "The names (or IDs) of the fields to return. When omitted, all fields are returned.",
  clean: (values) =>
    Array.isArray(values) && values.length
      ? values.map((field) => util.types.toString(field))
      : undefined,
});

const filterByFormula = input({
  label: "Filter By Formula",
  type: "string",
  example: "AND({Quantity} * {Price} > 100, NOT({Shipped?}))",
  placeholder: "Enter Airtable formula",
  required: false,
  comments:
    "An Airtable formula used to limit results to records matching specific criteria.",
  clean: (value) => util.types.toString(value) || undefined,
});

export const listRecordsInputs = {
  airtableConnection: connectionInput,
  baseId: baseIdInput,
  tableName,
  view,
  fields,
  filterByFormula,
};

export const getRecordInputs = {
  airtableConnection: connectionInput,
  baseId: baseIdInput,
  tableName,
  record: recordIdInput,
};

export const createRecordInputs = {
  airtableConnection: connectionInput,
  baseId: baseIdInput,
  tableName,
  recordFields,
  dynamicFields,
};

export const updateRecordInputs = {
  airtableConnection: connectionInput,
  baseId: baseIdInput,
  tableName,
  record: recordIdInput,
  recordFields,
  dynamicFields,
};

export const deleteRecordInputs = {
  airtableConnection: connectionInput,
  baseId: baseIdInput,
  tableName,
  recordId: recordIdInput,
};
