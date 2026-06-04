import { input, util } from "@prismatic-io/spectral";
import { toOptionalString, toStringList } from "../util";
import { baseIdInput, connectionInput, tableName } from "./common";

const dataTypes = input({
  label: "Data Types",
  type: "string",
  collection: "valuelist",
  required: true,
  default: ["tableData"],
  model: [
    { label: "Table Data (Records)", value: "tableData" },
    { label: "Table Fields (Schema)", value: "tableFields" },
    { label: "Table Metadata", value: "tableMetadata" },
  ],
  comments: "Types of changes to monitor.",
  clean: toStringList,
});

const recordChangeScope = input({
  label: "Record Change Scope",
  type: "string",
  required: false,
  comments:
    "Optional table ID or view ID to limit webhook to specific table/view. Leave empty to monitor all tables in base.",
  example: "tblMwMnUJpKoJUDzo",
  placeholder: "Enter table ID or view ID",
  clean: toOptionalString,
});

const pollView = input({
  label: "View",
  type: "string",
  example: "Grid view",
  placeholder: "Enter view name or ID",
  required: false,
  comments:
    "Optional view (name or ID) to scope the poll to. When set, only records in that view are considered.",
  clean: toOptionalString,
});

const additionalFilter = input({
  label: "Additional Filter Formula",
  type: "string",
  required: false,
  example: "{Status} = 'Active'",
  placeholder: "Enter Airtable formula",
  comments:
    "Optional Airtable formula combined (AND) with the modification-time filter applied by the trigger.",
  clean: toOptionalString,
});

const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, records with a `createdTime` after the last poll are included in the trigger results.",
  clean: util.types.toBool,
});

const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, records modified after the last poll (but created earlier) are included in the trigger results.",
  clean: util.types.toBool,
});

export const webhookInputs = {};

export const baseChangesInputs = {
  airtableConnection: connectionInput,
  baseId: {
    ...baseIdInput,
    required: true,
    comments: "The ID of the base to interact with.",
  },
  dataTypes,
  recordChangeScope,
};

export const pollChangesInputs = {
  airtableConnection: connectionInput,
  baseId: {
    ...baseIdInput,
    required: true,
    comments: "The ID of the base containing the table to poll.",
  },
  tableName,
  pollView,
  additionalFilter,
  showNewRecords,
  showUpdatedRecords,
};
