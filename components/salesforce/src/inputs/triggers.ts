import { input, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  description,
  dynamicValues,
  fieldValues,
  fieldValueTypes,
  maxRecordsToFetch,
  recordType,
  version,
} from "./common";
import { fieldsInput, nameInput, triggerTypeInput } from "./workflows";
import { cleanValueList } from "../util";

const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, newly created records are included in the polling results.",
  clean: util.types.toBool,
});

const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, recently modified records are included in the polling results.",
  clean: util.types.toBool,
});

const showDeletedRecords = input({
  label: "Show Deleted Records",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, recently deleted records are included in the polling results.",
  clean: util.types.toBool,
});

const selectedFields = input({
  label: "Selected Fields",
  placeholder: "Enter field API names",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Specific field API names to include in results. Leave empty to return all fields. Id, CreatedDate, and LastModifiedDate are always included automatically.",
  example: "Name",
  clean: cleanValueList,
});

const returnIdsOnly = input({
  label: "Return IDs Only",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, only record IDs and date fields are returned (Id, CreatedDate, LastModifiedDate). Overrides Selected Fields. Use this to minimize data returned by the trigger.",
  clean: util.types.toBool,
});

export const pollChangesTriggerInputs = {
  connection: connectionInput,
  recordType,
  showNewRecords,
  showUpdatedRecords,
  showDeletedRecords,
  selectedFields,
  returnIdsOnly,
  version,
  dynamicValues,
  fieldValues,
  fieldValueTypes,
  maxRecordsToFetch: {
    ...maxRecordsToFetch,
    comments: "The maximum number of records the trigger will fetch. Defaults to 20,000 records.",
  },
};

export const workflowTriggerInputs = {
  connection: connectionInput,
  recordType,
  triggerType: triggerTypeInput,
  outboundMessageName: {
    ...nameInput,
    label: "Outbound Message Name",
    comments: "The name of the outbound message to be used.",
    example: "MyOutboundMessage",
    dataSource: "selectOutboundMessage",
    placeholder: "Enter outbound message name",
  },
  workflowRuleName: {
    ...nameInput,
    label: "Workflow Rule Name",
    comments: "The name of the workflow rule to be used.",
    example: "MyWorkflowRule",
    placeholder: "Enter workflow rule name",
  },
  description,
  fields: fieldsInput,
  version,
};
