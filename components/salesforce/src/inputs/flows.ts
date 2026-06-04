import { input, util } from "@prismatic-io/spectral";
import { capitalizeSalesforceObject, cleanStringInput, sanitizePrefix } from "../util";
import { connectionInput, description, version } from "./common";
import { dynamicFieldsInput, endpointUrlInput, fieldsInput } from "./workflows";

const flowNameInput = input({
  label: "Flow Name",
  placeholder: "Enter flow name",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectFlow",
  comments:
    "The name for the Flow. Accepts both display names and API names. Display names are automatically converted to API format, while API names are used as is.",
});

const flowStatusInput = input({
  label: "Flow Status",
  placeholder: "Select a status",
  type: "string",
  required: false,
  default: "Draft",
  model: [
    { label: "Active", value: "Active" },
    { label: "Draft", value: "Draft" },
    { label: "Obsolete", value: "Obsolete" },
    { label: "Invalid Draft", value: "InvalidDraft" },
  ],
  comments:
    "The publication status of the Flow. Active flows execute when triggered; Draft and Obsolete flows do not.",
  clean: cleanStringInput,
});

const flowRunInModeInput = input({
  label: "Run In Mode",
  placeholder: "Select run mode",
  type: "string",
  required: false,
  default: "DefaultMode",
  model: [
    { label: "Default Mode", value: "DefaultMode" },
    { label: "System Mode Without Sharing", value: "SystemModeWithoutSharing" },
    { label: "System Mode With Sharing", value: "SystemModeWithSharing" },
  ],
  comments:
    "The context user mode the Flow runs as. DefaultMode respects user permissions and sharing rules. SystemModeWithoutSharing grants broad data access but may lead to security warnings.",
  clean: cleanStringInput,
});

const flowMetadataInput = input({
  label: "Flow Metadata",
  placeholder: "Enter flow metadata in JSON format",
  type: "code",
  required: false,
  language: "json",
  comments: "Additional Flow metadata in JSON format. This will be merged with other inputs.",
  example: JSON.stringify(
    {
      label: "A new flow",
    },
    null,
    2,
  ),
  clean: util.types.toObject,
});

const triggerObjectInput = input({
  label: "Trigger Record Type",
  placeholder: "Select or enter a record type",
  type: "string",
  required: true,
  comments:
    "The Salesforce object API name (e.g., Account, Contact) whose record changes will trigger this flow.",
  dataSource: "selectRecordType",
  clean: capitalizeSalesforceObject,
});

const triggerOnInput = input({
  label: "Trigger On",
  placeholder: "Select trigger condition",
  type: "string",
  required: true,
  model: [
    { label: "Create", value: "Create" },
    { label: "Update", value: "Update" },
    { label: "Create and Update", value: "CreateAndUpdate" },
  ],
  default: "CreateAndUpdate",
  comments: "When to trigger the flow (record creation, update, or both).",
  clean: util.types.toString,
});

const prefixInput = input({
  label: "Prefix",
  type: "string",
  required: true,
  comments:
    "Sets a prefix to the Flow Name and Outbound Messages created. Must start with a letter, can contain letters, numbers, underscores, and be at most 15 characters.",
  example: "Acme_Services",
  placeholder: "Enter prefix",
  clean: sanitizePrefix,
});

const filterFormulaInput = input({
  label: "Filter Formula",
  placeholder: "Enter filter formula",
  example: "AnnualRevenue > 1000000",
  type: "string",
  required: false,
  clean: cleanStringInput,
  comments: "Optional formula to filter which records trigger the flow.",
});

export const activateFlowInputs = {
  version,
  flowName: flowNameInput,
  connection: connectionInput,
};

export const createFlowInputs = {
  version,
  flowName: { ...flowNameInput, dataSource: undefined },
  description,
  runInMode: flowRunInModeInput,
  flowMetadata: flowMetadataInput,
  connection: connectionInput,
};

export const deactivateFlowInputs = {
  version,
  flowName: flowNameInput,
  connection: connectionInput,
};

export const deleteFlowInputs = {
  version,
  flowName: flowNameInput,
  connection: connectionInput,
};

export const getFlowInputs = {
  version,
  flowName: flowNameInput,
  connection: connectionInput,
};

export const listFlowsInputs = {
  version,
  connection: connectionInput,
};

export const updateFlowInputs = {
  version,
  flowName: flowNameInput,
  description: {
    ...description,

    comments: "Updated description for the Flow.",
  },
  status: { ...flowStatusInput, default: undefined },
  flowMetadata: flowMetadataInput,
  connection: connectionInput,
};

export const flowOutboundMessageTriggerInputs = {
  version,
  prefix: prefixInput,
  triggerObject: triggerObjectInput,
  triggerOn: triggerOnInput,
  fields: fieldsInput,
  flowMetadata: flowMetadataInput,
  filterFormula: { ...filterFormulaInput, example: "ISCHANGED(Email) && NOT(ISBLANK(Email))" },
  connection: connectionInput,
};

export const subscribeToRecordChangesInputs = {
  version,
  prefix: prefixInput,
  endpointUrl: endpointUrlInput,
  triggerObject: triggerObjectInput,
  triggerOn: triggerOnInput,
  fields: fieldsInput,
  dynamicFields: dynamicFieldsInput,
  flowMetadata: flowMetadataInput,
  filterFormula: { ...filterFormulaInput, example: "ISCHANGED(Email) && NOT(ISBLANK(Email))" },
  connection: connectionInput,
};

export const deleteInstancedFlowsAndOutboundMessagesInputs = {
  version,
  endpointUrl: {
    ...endpointUrlInput,
    comments: "The endpoint URL to delete the instanced flows and outbound messages for.",
  },
  connection: connectionInput,
};
