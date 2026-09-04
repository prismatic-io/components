import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import {
  activeInput,
  commentInput,
  commentsInput,
  connectionInput,
  creatorFullNameInput,
  creatorGuidInput,
  descriptionInput,
  fetchAllInput,
  guidInput,
  includeEmptyAdditionalAttributesInput,
  nameInput,
  numberInput,
  pagination,
  qualityProcessGuidInput,
  statusInput,
  stepGuidInput,
  templateGuidInput,
  userGuidInput,
} from "./common";
const decisionTypeInput = input({
  label: "Decision Type",
  type: "string",
  required: true,
  model: [
    { label: "All Required", value: "ALL_REQUIRED" },
    { label: "One Required", value: "ONE_REQUIRED" },
    { label: "Optional", value: "OPTIONAL" },
    { label: "Comments Only", value: "COMMENTS_ONLY" },
  ],
  comments: "The type of decision requirement for the approver.",
  clean: util.types.toString,
});
const groupGuidInput = input({
  label: "Group GUID",
  type: "string",
  required: false,
  placeholder: "Enter group GUID",
  comments:
    "The GUID of the user group to add as approver (either user or group required).",
  example: "QP4KL5MN6OP7QR8ST9UV0WX1",
  clean: toOptionalString,
});
const requestTypeInput = input({
  label: "Request Type",
  type: "string",
  required: true,
  model: [
    { label: "Quality Process Status Change", value: "qualityStatus" },
    { label: "Quality Step Workflow", value: "stepWorkflow" },
  ],
  placeholder: "Select request type",
  comments:
    "Choose whether to change the overall quality process status or a specific step status.",
  clean: util.types.toString,
});
const targetCompletionDateTimeInput = input({
  label: "Target Completion Date Time",
  type: "string",
  required: false,
  placeholder: "Enter target completion date time",
  comments: "Target completion date and time (ISO format).",
  example: "2024-12-31T23:59:59Z",
  clean: toOptionalString,
});
const ownerGuidInput = input({
  label: "Owner GUID",
  type: "string",
  required: false,
  placeholder: "Enter owner GUID",
  comments: "The GUID of the quality process owner.",
  example: "QP4KL5MN6OP7QR8ST9UV0WX1",
  clean: toOptionalString,
});
const numberFormatPrefixGuidInput = input({
  label: "Number Format Prefix GUID",
  type: "string",
  required: false,
  placeholder: "Enter number format prefix GUID",
  comments: "The GUID of the number format prefix for the template.",
  example: "QP4KL5MN6OP7QR8ST9UV0WX1",
  clean: toOptionalString,
});
const typeInput = input({
  label: "Quality Process Type",
  type: "string",
  required: false,
  placeholder: "Enter quality process type",
  comments: "The type of quality process.",
  clean: toOptionalString,
});
const affectedObjectGuidInput = input({
  label: "Affected Object GUID",
  type: "string",
  required: true,
  placeholder: "Enter affected object GUID",
  comments: "The GUID of the object to be affected (item, change, file, etc.).",
  example: "QP4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const affectedStepGuidInput = input({
  label: "Affected Step GUID",
  type: "string",
  required: true,
  placeholder: "Enter affected step GUID",
  comments: "The GUID of the quality process step to be affected.",
  example: "QP4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const linkInput = input({
  label: "URL Link",
  type: "string",
  required: true,
  placeholder: "Enter URL link",
  comments: "The URL link to be added as an affected object.",
  example: "https://example.com/document",
  clean: util.types.toString,
});
const displayInput = input({
  label: "Display Name",
  type: "string",
  required: false,
  placeholder: "Enter display name",
  comments: "Display name for the URL.",
  example: "Important Document",
  clean: toOptionalString,
});
const affectedGuidInput = input({
  label: "Affected Object GUID",
  type: "string",
  required: true,
  placeholder: "Enter affected object GUID",
  comments: "The GUID of the affected object.",
  example: "QP4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const ownerFullNameInput = input({
  label: "Owner Full Name",
  type: "string",
  required: false,
  placeholder: "Enter owner full name",
  comments: "Filter by owner full name.",
  example: "Alex Chen",
  clean: toOptionalString,
});
const attributeGroupGuidInput = input({
  label: "Attribute Group GUID",
  type: "string",
  required: true,
  placeholder: "Enter attribute group GUID",
  comments: "The GUID of the attribute group to retrieve.",
  example: "QP4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const decisionGuidInput = input({
  label: "Decision GUID",
  type: "string",
  required: true,
  placeholder: "Enter decision GUID",
  comments: "The GUID of the decision to submit.",
  example: "QP4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const decisionInput = input({
  label: "Decision",
  type: "string",
  required: true,
  model: [
    { label: "Approved", value: "APPROVED" },
    { label: "Rejected", value: "REJECTED" },
    { label: "Comment", value: "COMMENT" },
  ],
  comments: "The decision to make on the sign-off step.",
  clean: util.types.toString,
});
const dataInput = input({
  label: "Quality Process Update Data",
  type: "data",
  required: true,
  comments:
    "JSON object containing quality process update data (QualityProcessUpdateVo schema).",
  example: "2026-05-10T09:15:00Z",
  clean: util.types.toObject,
});
const affectedNotesInput = input({
  label: "Notes",
  type: "string",
  required: false,
  placeholder: "Enter notes",
  comments: "Optional notes for the affected object.",
  clean: toOptionalString,
});
const qualityIncludePossibleValuesBoolInput = input({
  label: "Include Possible Values",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, possible values for dropdown attributes are included.",
  clean: util.types.toBool,
});
const qualityCreatableOnlyBoolInput = input({
  label: "Creatable Only",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, only attributes that can be used during creation are returned.",
  clean: util.types.toBool,
});
const qualityEditableOnlyBoolInput = input({
  label: "Editable Only",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, only attributes that can be edited are returned.",
  clean: util.types.toBool,
});
const qualitySearchableOnlyBoolInput = input({
  label: "Searchable Only",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, only attributes that can be used in searches are returned.",
  clean: util.types.toBool,
});
const qualityIncludeDeletedBoolInput = input({
  label: "Include Deleted",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, deleted attributes are included in the results.",
  clean: util.types.toBool,
});
export const addQualityStepApproverInputs = {
  connection: connectionInput,
  qualityprocessGuid: {
    ...qualityProcessGuidInput,
    comments: "The GUID of the quality process containing the step.",
  },
  stepGuid: {
    ...stepGuidInput,
    required: true,
    comments: "The GUID of the quality process sign-off step.",
    clean: util.types.toString,
  },
  decisionType: decisionTypeInput,
  userGuid: {
    ...userGuidInput,
    comments:
      "The GUID of the user to add as approver (either user or group required).",
  },
  groupGuid: groupGuidInput,
};
export const changeQualityProcessStatusInputs = {
  connection: connectionInput,
  requestType: requestTypeInput,
  qualityProcessGuid: qualityProcessGuidInput,
  status: {
    ...statusInput,
    model: [
      { label: "Open", value: "OPEN" },
      { label: "Completed", value: "COMPLETED" },
      { label: "Submitted", value: "SUBMITTED" },
      { label: "Canceled", value: "CANCELED" },
    ],
    placeholder: "Select status",
    comments:
      "The new status for the quality process (required for Quality Process Status Change).",
  },
  stepGuid: {
    ...stepGuidInput,
    comments:
      "The GUID of the quality process step (required for Quality Step Workflow).",
  },
  comment: {
    ...commentInput,
    comments: "Optional comment for the status change.",
  },
};
export const createQualityProcessInputs = {
  connection: connectionInput,
  name: {
    ...nameInput,
    label: "Quality Process Name",
    placeholder: "Enter quality process name",
    comments: "The name of the quality process.",
  },
  description: {
    ...descriptionInput,
    comments: "Description of the quality process.",
  },
  targetCompletionDateTime: targetCompletionDateTimeInput,
  ownerGuid: ownerGuidInput,
  templateGuid: {
    ...templateGuidInput,
    required: false,
    clean: toOptionalString,
    comments: "The GUID of the quality process template.",
  },
  numberFormatPrefixGuid: numberFormatPrefixGuidInput,
  type: typeInput,
};
export const createQualityProcessStepAffectedInputs = {
  connection: connectionInput,
  qualityProcessGuid: {
    ...qualityProcessGuidInput,
    comments: "The GUID of the quality process containing the step.",
  },
  stepGuid: {
    ...stepGuidInput,
    required: true,
    comments:
      "The GUID of the quality process step to add the affected object to.",
    clean: util.types.toString,
  },
  affectedObjectGuid: affectedObjectGuidInput,
  notes: affectedNotesInput,
};
export const createQualityProcessStepAffectedQualityInputs = {
  connection: connectionInput,
  qualityProcessGuid: {
    ...qualityProcessGuidInput,
    comments: "The GUID of the quality process containing the step.",
  },
  stepGuid: {
    ...stepGuidInput,
    required: true,
    comments:
      "The GUID of the quality process step to add the quality affected object to.",
    clean: util.types.toString,
  },
  guid: {
    ...guidInput,
    label: "Affected Quality Object GUID",
    placeholder: "Enter affected quality object GUID",
    comments: "Optional GUID for the affected quality object.",
  },
  affectedStepGuid: affectedStepGuidInput,
};
export const createQualityProcessStepAffectedUrlInputs = {
  connection: connectionInput,
  qualityProcessGuid: {
    ...qualityProcessGuidInput,
    comments: "The GUID of the quality process containing the step.",
  },
  stepGuid: {
    ...stepGuidInput,
    required: true,
    comments:
      "The GUID of the quality process step to add the URL affected object to.",
    clean: util.types.toString,
  },
  guid: {
    ...guidInput,
    label: "Affected URL Object GUID",
    placeholder: "Enter affected URL object GUID",
    comments: "Optional GUID for the affected URL object.",
  },
  link: linkInput,
  display: displayInput,
  description: {
    ...descriptionInput,
    comments: "Description for the URL.",
  },
};
export const deleteQualityProcessInputs = {
  connection: connectionInput,
  qualityProcessGuid: {
    ...qualityProcessGuidInput,
    comments: "The GUID of the quality process to delete.",
  },
};
export const deleteQualityProcessStepAffectedInputs = {
  connection: connectionInput,
  qualityProcessGuid: {
    ...qualityProcessGuidInput,
    comments: "The GUID of the quality process containing the step.",
  },
  stepGuid: {
    ...stepGuidInput,
    required: true,
    comments:
      "The GUID of the quality process step containing the affected object.",
    clean: util.types.toString,
  },
  affectedGuid: {
    ...affectedGuidInput,
    comments: "The GUID of the affected object to delete.",
  },
};
export const getQualityProcessByGuidInputs = {
  connection: connectionInput,
  qualityProcessGuid: {
    ...qualityProcessGuidInput,
    comments: "The GUID of the quality process to retrieve.",
  },
};
export const listQualityProcessesInputs = {
  connection: connectionInput,
  number: {
    ...numberInput,
    label: "Quality Number",
    placeholder: "Enter quality process number",
    comments: "Filter by quality process number.",
  },
  name: {
    ...nameInput,
    label: "Quality Name",
    placeholder: "Enter quality process name",
    comments: "Filter by quality process name.",
  },
  description: {
    ...descriptionInput,
    comments: "Filter by quality process description.",
  },
  templateGuid: {
    ...templateGuidInput,
    required: false,
    clean: toOptionalString,
    comments: "Filter by quality process template GUID.",
  },
  type: {
    ...typeInput,
    label: "Quality Type",
    placeholder: "Enter quality type",
    comments: "Filter by quality process type.",
  },
  ownerFullName: ownerFullNameInput,
  ownerGuid: {
    ...ownerGuidInput,
    comments: "Filter by owner GUID.",
  },
  status: {
    ...statusInput,
    comments: "Filter by quality process status.",
  },
  creatorFullName: creatorFullNameInput,
  creatorGuid: creatorGuidInput,
  fetchAll: fetchAllInput,
  pagination,
};
export const getQualityProcessNumberFormatByGuidInputs = {
  connection: connectionInput,
  guid: {
    ...guidInput,
    label: "Number Format GUID",
    required: true,
    placeholder: "Enter number format GUID",
    comments: "The GUID of the quality process number format to retrieve.",
    clean: util.types.toString,
  },
};
export const listQualityProcessNumberFormatsInputs = {
  connection: connectionInput,
};
export const listQualityProcessOwnersInputs = {
  connection: connectionInput,
};
export const listQualityProcessStepAffectedInputs = {
  connection: connectionInput,
  qualityProcessGuid: {
    ...qualityProcessGuidInput,
    comments: "The GUID of the quality process containing the step.",
  },
  stepGuid: {
    ...stepGuidInput,
    required: true,
    comments:
      "The GUID of the quality process step to get affected objects from.",
    clean: util.types.toString,
  },
};
export const getQualityProcessStepAffectedByGuidInputs = {
  connection: connectionInput,
  qualityProcessGuid: {
    ...qualityProcessGuidInput,
    comments: "The GUID of the quality process containing the step.",
  },
  stepGuid: {
    ...stepGuidInput,
    required: true,
    comments:
      "The GUID of the quality process step containing the affected object.",
    clean: util.types.toString,
  },
  affectedGuid: {
    ...affectedGuidInput,
    comments: "The GUID of the affected object to retrieve.",
  },
};
export const getQualityProcessStepAttributeGroupByGuidInputs = {
  connection: connectionInput,
  attributeGroupGuid: attributeGroupGuidInput,
};
export const listQualityProcessStepAttributeGroupsInputs = {
  connection: connectionInput,
};
export const listQualityProcessStepAttributesInputs = {
  connection: connectionInput,
  includePossibleValues: qualityIncludePossibleValuesBoolInput,
  creatableOnly: qualityCreatableOnlyBoolInput,
  editableOnly: qualityEditableOnlyBoolInput,
  searchableOnly: qualitySearchableOnlyBoolInput,
  includeDeleted: qualityIncludeDeletedBoolInput,
};
export const getQualityProcessStepByGuidInputs = {
  connection: connectionInput,
  qualityProcessGuid: {
    ...qualityProcessGuidInput,
    comments: "The GUID of the quality process containing the step.",
  },
  stepGuid: {
    ...stepGuidInput,
    required: true,
    comments: "The GUID of the quality process step to retrieve.",
    clean: util.types.toString,
  },
  includeEmptyAdditionalAttributes: includeEmptyAdditionalAttributesInput,
};
export const listQualityProcessStepsInputs = {
  connection: connectionInput,
  qualityProcessGuid: {
    ...qualityProcessGuidInput,
    comments: "The GUID of the quality process to get steps for.",
  },
};
export const listQualityProcessTemplateAttributeGroupsInputs = {
  connection: connectionInput,
  templateGuid: {
    ...templateGuidInput,
    comments: "The GUID of the quality process template.",
  },
};
export const listQualityProcessTemplateAttributesInputs = {
  connection: connectionInput,
  templateGuid: {
    ...templateGuidInput,
    comments: "The GUID of the quality process template.",
  },
  includePossibleValues: qualityIncludePossibleValuesBoolInput,
  creatableOnly: qualityCreatableOnlyBoolInput,
  editableOnly: qualityEditableOnlyBoolInput,
  searchableOnly: qualitySearchableOnlyBoolInput,
  includeDeleted: qualityIncludeDeletedBoolInput,
};
export const getQualityProcessTemplateByGuidInputs = {
  connection: connectionInput,
  templateGuid: {
    ...templateGuidInput,
    comments: "The GUID of the quality process template to retrieve.",
  },
};
export const listQualityProcessTemplatesInputs = {
  connection: connectionInput,
  name: {
    ...nameInput,
    label: "Template Name",
    placeholder: "Enter template name",
    comments: "Filter by quality process template name.",
  },
  active: {
    ...activeInput,
    comments: "When true, only active templates are shown.",
  },
};
export const listQualityStepDecisionsInputs = {
  connection: connectionInput,
  qualityprocessGuid: {
    ...qualityProcessGuidInput,
    comments: "The GUID of the quality process containing the step.",
  },
  stepGuid: {
    ...stepGuidInput,
    required: true,
    comments: "The GUID of the quality process sign-off step.",
    clean: util.types.toString,
  },
};
export const submitQualityStepDecisionInputs = {
  connection: connectionInput,
  qualityprocessGuid: {
    ...qualityProcessGuidInput,
    comments: "The GUID of the quality process containing the step.",
  },
  stepGuid: {
    ...stepGuidInput,
    required: true,
    clean: util.types.toString,
  },
  decisionGuid: decisionGuidInput,
  decision: decisionInput,
  comments: {
    ...commentsInput,
    placeholder: "Enter decision comments",
    comments: "Optional comments for the decision.",
  },
};
export const updateQualityProcessInputs = {
  connection: connectionInput,
  qualityProcessGuid: {
    ...qualityProcessGuidInput,
    comments: "The GUID of the quality process to update.",
  },
  data: dataInput,
};
export const updateQualityProcessStepInputs = {
  connection: connectionInput,
  qualityProcessGuid: {
    ...qualityProcessGuidInput,
    comments: "The GUID of the quality process containing the step.",
  },
  stepGuid: {
    ...stepGuidInput,
    required: true,
    comments: "The GUID of the quality process step to update.",
    clean: util.types.toString,
  },
  data: {
    ...dataInput,
    label: "Quality Step Update Data",
    comments:
      "JSON object containing quality step update data (QualityStepUpdateVo schema).",
  },
};
export const updateQualityProcessStepAffectedInputs = {
  connection: connectionInput,
  qualityProcessGuid: {
    ...qualityProcessGuidInput,
    comments: "The GUID of the quality process containing the step.",
  },
  stepGuid: {
    ...stepGuidInput,
    required: true,
    comments:
      "The GUID of the quality process step containing the affected object.",
    clean: util.types.toString,
  },
  affectedGuid: {
    ...affectedGuidInput,
    comments: "The GUID of the affected object to update.",
  },
  notes: {
    ...affectedNotesInput,
    comments: "Notes for the affected object.",
  },
};
