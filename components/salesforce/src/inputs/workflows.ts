import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput, fieldsInputClean } from "../util";
import { connectionInput, description, version, workflowRecordType } from "./common";
import { fullNameInput } from "./metadata";

const ruleNameInput = input({
  label: "Rule Name",
  placeholder: "Enter rule name",
  type: "string",
  required: true,
  comments: "The name of the Salesforce Workflow Rule to create or reference.",
  clean: util.types.toString,
});

export const triggerTypeInput = input({
  label: "Trigger Type",
  type: "string",
  model: [
    { label: "On All Changes", value: "onAllChanges" },
    { label: "On Create Only", value: "onCreateOnly" },
    {
      label: "On Create or Meets Rule Criteria",
      value: "onCreateOrTriggeringUpdate",
    },
  ],
  required: true,
  default: "onAllChanges",
  comments:
    "Conditions in which the trigger fires. On All Changes: The workflow rule is considered on all changes. On Create Only: Considered on creation. On Create or Meets Rule Criteria: Considered on create and when it is updated to meet any Rule Criteria configured to the workflow rule.",
  clean: util.types.toString,
});

const activeInput = input({
  label: "Active",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, the workflow rule is active and will fire when its criteria are met.",
  clean: util.types.toBool,
});

const outboundMessageActionsInput = input({
  label: "Outbound Message Actions",
  type: "string",
  required: false,
  collection: "valuelist",
  comments: "Full Names of the Outbound Message Actions for this Rule to fire.",
});

const filterCriteriaInput = input({
  label: "Rule Criteria Filter",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Filter criteria data structure to use with the rule, use this or Formula. See [Salesforce Metadata API - FilterItem](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/customfield.htm#filteritem) for the expected structure.",
  example: JSON.stringify([
    {
      field: "Account.CreatedDate",
      operation: "notEqual",
      value: "01/01/2022",
    },
  ]),
});

export const endpointUrlInput = input({
  label: "Endpoint URL",
  type: "string",
  required: true,
  comments: "The endpoint URL to send the outbound message / webhook to",
  example: "https://example.com/webhook",
  clean: util.types.toString,
});

const integrationUserEmailInput = input({
  label: "Integration User Email",
  type: "string",
  required: false,
  comments:
    "The email of the user under which the payload is sent. If not provided, the current user will be used",
  example: "john@doe.com",
  clean: cleanStringInput,
});

export const nameInput = input({
  label: "Name",
  type: "string",
  required: true,
  comments: "The name of the Salesforce component such as an outbound message or workflow rule.",
  example: "MyComponent",
  placeholder: "Enter name",
  clean: util.types.toString,
});

const outboundMessageNameInput = input({
  label: "Outbound Message Name",
  type: "string",
  required: true,
  placeholder: "Enter outbound message name",
  comments: "The name of the Salesforce Outbound Message to create or reference.",
  example: "MyOutboundMessage",
  clean: util.types.toString,
});

export const fieldsInput = input({
  label: "Fields",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "Fields to include in the Outbound Message.",
  example: "Name, Phone, Email, etc.",
  placeholder: "Enter field names",
  clean: fieldsInputClean,
});

export const dynamicFieldsInput = input({
  label: "Dynamic Fields",
  type: "data",
  required: false,
  comments:
    "Dynamic Fields, provided by value collection config variable, to include in the Outbound Message",
});

const formulaInput = input({
  label: "Formula",
  type: "string",
  required: false,
  comments: "Formula to evaluate. Use this input or Filter Criteria",
  example: "OwnerId <> LastModifiedById",
  placeholder: "Enter formula expression",
  clean: cleanStringInput,
});

const triggerEvent = input({
  label: "Trigger Event",
  type: "string",
  model: [
    { label: "On Create", value: "onCreateOnly" },
    { label: "On All Changes", value: "onAllChanges" },
  ],
  default: "onAllChanges",
  required: true,
  comments: "The event condition that causes this workflow rule to fire.",
  clean: util.types.toString,
});

export const showTriggerableOnly = input({
  label: "Show Triggerable Only",
  type: "boolean",
  required: false,
  comments:
    "When true, only triggerable objects are returned. When false, all objects are returned.",
  clean: util.types.toBool,
});

export const createWorkflowRuleInputs = {
  version,
  recordType: workflowRecordType,
  ruleName: ruleNameInput,
  triggerType: triggerTypeInput,
  active: activeInput,
  description,
  filterCriteria: filterCriteriaInput,
  formulaInput,
  outboundMessageActions: outboundMessageActionsInput,
  connection: connectionInput,
};

export const listWorkflowRulesInputs = {
  version,
  connection: connectionInput,
};

export const deleteWorkflowRuleInputs = {
  version,
  fullName: fullNameInput,
  connection: connectionInput,
};

export const createWorkflowOutboundMessageInputs = {
  version,
  recordType: workflowRecordType,
  name: outboundMessageNameInput,
  description,
  endpointUrl: endpointUrlInput,
  integrationUserEmail: integrationUserEmailInput,
  fields: fieldsInput,
  dynamicFields: dynamicFieldsInput,
  connection: connectionInput,
};

export const listWorkflowOutboundMessagesInputs = {
  version,
  connection: connectionInput,
};

export const deleteWorkflowOutboundMessageInputs = {
  version,
  fullName: fullNameInput,
  connection: connectionInput,
};

export const subscribeToRecordChangeInputs = {
  version,
  name: outboundMessageNameInput,
  recordType: workflowRecordType,
  operation: triggerEvent,
  endpointUrl: endpointUrlInput,
  filterCriteria: filterCriteriaInput,
  formulaInput,
  integrationUserEmail: integrationUserEmailInput,
  description,
  fields: fieldsInput,
  dynamicFields: dynamicFieldsInput,
  connection: connectionInput,
};
