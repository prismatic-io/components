import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import {
  additionalAttributeJsonInput,
  additionalAttributesInput,
  assigneeGuidInput,
  attributeDefinitionsInput,
  connectionInput,
  creatorFullNameInput,
  creatorGuidInput,
  descriptionInput,
  fetchAllInput,
  fileGuidInput,
  numberInput,
  pagination,
  priorityInput,
  setNullInput,
  statusInput,
  titleInput,
} from "./common";
const requirementGuidInput = input({
  label: "Requirement GUID",
  type: "string",
  required: true,
  placeholder: "Enter requirement GUID",
  comments: "The unique identifier of the requirement.",
  example: "RM4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const requirementTemplateGuidInput = input({
  label: "Requirement Template GUID",
  type: "string",
  required: false,
  placeholder: "Enter requirement template GUID",
  comments: "The GUID of the requirement template.",
  example: "RM4KL5MN6OP7QR8ST9UV0WX1",
  clean: toOptionalString,
});
const requirementTemplateGuidCreateInput = input({
  label: "Requirement Template GUID",
  type: "string",
  required: true,
  placeholder: "Enter requirement template GUID",
  comments: "The GUID of the requirement template.",
  example: "RM4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const requirementTitleInput = input({
  label: "Title",
  type: "string",
  required: true,
  placeholder: "Enter requirement title",
  comments: "The title of the requirement.",
  clean: util.types.toString,
});
const requirementUpdateTitleInput = input({
  label: "Title",
  type: "string",
  required: false,
  placeholder: "Enter requirement title",
  comments: "The title of the requirement.",
  clean: toOptionalString,
});
const requirementDescriptionInput = input({
  label: "Description",
  type: "string",
  required: false,
  placeholder: "Enter requirement description",
  comments: "The description of the requirement.",
  clean: toOptionalString,
});
const requirementPriorityInput = input({
  label: "Priority",
  type: "string",
  required: false,
  placeholder: "Enter priority",
  comments:
    "The priority of the requirement. The accepted values come from the priority attribute configured in Arena, for example High or Medium.",
  clean: toOptionalString,
});
const requirementAssigneeGuidInput = input({
  label: "Assignee GUID",
  type: "string",
  required: false,
  placeholder: "Enter assignee user GUID",
  comments: "GUID of the user to assign the requirement to.",
  example: "RM4KL5MN6OP7QR8ST9UV0WX1",
  clean: toOptionalString,
});
const requirementNumberInput = input({
  label: "Number",
  type: "string",
  required: false,
  placeholder: "Enter requirement number",
  comments: "Custom requirement number (optional).",
  clean: toOptionalString,
});
const requirementNumberSequencePrefixInput = input({
  label: "Number Sequence Prefix",
  type: "string",
  required: false,
  placeholder: "Enter number sequence prefix",
  comments: "Number sequence prefix for auto-generating requirement number.",
  example: "ECO",
  clean: toOptionalString,
});
const requirementStatusInput = input({
  label: "Status",
  type: "string",
  required: true,
  placeholder: "Enter new status value",
  comments: "The new status value for the requirement.",
  clean: util.types.toString,
});
const childRequirementGuidInput = input({
  label: "Child Requirement GUID",
  type: "string",
  required: true,
  placeholder: "Enter child requirement GUID",
  comments: "The GUID of the child requirement.",
  example: "RM4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const requirementTraceLinkGuidInput = input({
  label: "Trace Link GUID",
  type: "string",
  required: true,
  placeholder: "Enter trace link GUID",
  comments: "The unique identifier of the trace link.",
  example: "RM4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const traceDirectionInput = input({
  label: "Trace Direction",
  type: "string",
  required: false,
  placeholder: "Select trace direction",
  comments: "Direction of the trace link (UPSTREAM or DOWNSTREAM).",
  model: [
    { label: "Upstream", value: "UPSTREAM" },
    { label: "Downstream", value: "DOWNSTREAM" },
  ],
  clean: toOptionalString,
});
const traceObjectTypeInput = input({
  label: "Trace Object Type",
  type: "string",
  required: false,
  placeholder: "Select trace object type",
  comments: "The type of object being traced (ITEM or REQUIREMENT).",
  model: [
    { label: "Item", value: "ITEM" },
    { label: "Requirement", value: "REQUIREMENT" },
  ],
  clean: toOptionalString,
});
const requirementFileAssocGuidInput = input({
  label: "File Association GUID",
  type: "string",
  required: true,
  placeholder: "Enter file association GUID",
  comments: "The GUID of the requirement-file association.",
  example: "RM4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const requirementQualityAssocGuidInput = input({
  label: "Quality Association GUID",
  type: "string",
  required: true,
  placeholder: "Enter quality association GUID",
  comments: "The GUID of the requirement-quality association.",
  example: "RM4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const requirementTicketAssocGuidInput = input({
  label: "Ticket Association GUID",
  type: "string",
  required: true,
  placeholder: "Enter ticket association GUID",
  comments: "The GUID of the requirement-ticket association.",
  example: "RM4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const requirementTreeViewInput = input({
  label: "View",
  type: "string",
  required: false,
  default: "tree",
  comments: 'Set to "tree" for hierarchical view or "list" for flat view',
  model: [
    { label: "Tree", value: "tree" },
    { label: "List", value: "list" },
  ],
  clean: toOptionalString,
});
const requirementTraceSuspectInput = input({
  label: "Suspect",
  type: "boolean",
  required: false,
  comments:
    "When true, only requirements with a suspected trace status are returned.",
  clean: util.types.toBool,
});
const requirementTraceRelationshipTypeGuidInput = input({
  label: "Relationship Type GUID",
  type: "string",
  required: false,
  placeholder: "Enter relationship type GUID",
  comments: "The GUID of the trace relationship type.",
  example: "RM4KL5MN6OP7QR8ST9UV0WX1",
  clean: toOptionalString,
});
const requirementTraceItemGuidInput = input({
  label: "Trace Item GUID",
  type: "string",
  required: false,
  placeholder: "Enter item GUID to trace",
  comments: "GUID of the item to link via trace (use when objectType is ITEM).",
  example: "RM4KL5MN6OP7QR8ST9UV0WX1",
  clean: toOptionalString,
});
const requirementTraceRequirementGuidInput = input({
  label: "Trace Target Requirement GUID",
  type: "string",
  required: false,
  placeholder: "Enter target requirement GUID",
  comments:
    "GUID of the requirement to link via trace (use when objectType is REQUIREMENT).",
  example: "RM4KL5MN6OP7QR8ST9UV0WX1",
  clean: toOptionalString,
});
const qualityGuidInput = input({
  label: "Quality Process GUID",
  type: "string",
  required: true,
  placeholder: "Enter quality process GUID",
  comments: "The GUID of the quality process to link.",
  example: "RM4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const requirementQualityStepGuidInput = input({
  label: "Quality Step GUID",
  type: "string",
  required: true,
  placeholder: "Enter quality step GUID",
  comments: "The GUID of the specific quality step within the quality process.",
  example: "RM4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const requirementTicketGuidInput = input({
  label: "Ticket GUID",
  type: "string",
  required: true,
  placeholder: "Enter ticket GUID",
  comments: "The GUID of the ticket to link to the requirement.",
  example: "RM4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const requirementTemplateNameFilterInput = input({
  label: "Name Filter",
  type: "string",
  required: false,
  placeholder: "Enter template name",
  comments: "Optional filter by requirement template name.",
  clean: toOptionalString,
});
const requirementTemplateActiveFilterInput = input({
  label: "Active",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, only active templates are returned.",
  clean: util.types.toBool,
});
const requirementTemplateIncludePossibleValuesInput = input({
  label: "Include Possible Values",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, possible values for dropdown or list attributes are included.",
  clean: util.types.toBool,
});
const requirementTemplateCreatableOnlyInput = input({
  label: "Creatable Only",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, only attributes that can be set during creation are returned.",
  clean: util.types.toBool,
});
const requirementTemplateEditableOnlyInput = input({
  label: "Editable Only",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, only editable attributes are returned.",
  clean: util.types.toBool,
});
const requirementTemplateSearchableOnlyInput = input({
  label: "Searchable Only",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, only searchable attributes are returned.",
  clean: util.types.toBool,
});
const requirementAssigneeFullNameInput = input({
  label: "Assignee Full Name",
  type: "string",
  required: false,
  placeholder: "Enter assignee full name",
  comments: "Filter by assignee full name.",
  example: "Alex Chen",
  clean: toOptionalString,
});
const requirementModificationDateTimeInput = input({
  label: "Modification Date Time",
  type: "string",
  required: false,
  placeholder: "Enter modification date time",
  comments: "Filter by modification date/time.",
  example: "2026-05-10T09:15:00Z",
  clean: toOptionalString,
});
const requirementAnySearchInput = input({
  label: "Any",
  type: "string",
  required: false,
  placeholder: "Enter search term",
  comments: "Full-text search across all fields.",
  clean: toOptionalString,
});
export const addRequirementChildInputs = {
  connection: connectionInput,
  requirementGuid: requirementGuidInput,
  childRequirementGuid: childRequirementGuidInput,
};
export const addRequirementFileInputs = {
  connection: connectionInput,
  requirementGuid: requirementGuidInput,
  fileGuid: fileGuidInput,
};
export const addRequirementQualityInputs = {
  connection: connectionInput,
  requirementGuid: requirementGuidInput,
  qualityGuid: qualityGuidInput,
  stepGuid: requirementQualityStepGuidInput,
};
export const addRequirementTicketInputs = {
  connection: connectionInput,
  requirementGuid: requirementGuidInput,
  ticketGuid: requirementTicketGuidInput,
};
export const addRequirementTraceInputs = {
  connection: connectionInput,
  requirementGuid: requirementGuidInput,
  direction: traceDirectionInput,
  objectType: traceObjectTypeInput,
  relationshipTypeGuid: requirementTraceRelationshipTypeGuidInput,
  itemGuid: requirementTraceItemGuidInput,
  targetRequirementGuid: requirementTraceRequirementGuidInput,
};
export const changeRequirementStatusInputs = {
  connection: connectionInput,
  requirementGuid: requirementGuidInput,
  status: requirementStatusInput,
};
export const createRequirementInputs = {
  connection: connectionInput,
  templateGuid: requirementTemplateGuidCreateInput,
  title: requirementTitleInput,
  description: requirementDescriptionInput,
  priority: requirementPriorityInput,
  assigneeGuid: requirementAssigneeGuidInput,
  number: requirementNumberInput,
  numberSequencePrefix: requirementNumberSequencePrefixInput,
  additionalAttributes: additionalAttributesInput,
  attributeDefinitions: attributeDefinitionsInput,
  additionalAttributeJson: additionalAttributeJsonInput,
};
export const deleteRequirementInputs = {
  connection: connectionInput,
  requirementGuid: requirementGuidInput,
};
export const deleteRequirementTraceInputs = {
  connection: connectionInput,
  requirementGuid: requirementGuidInput,
  traceLinkGuid: requirementTraceLinkGuidInput,
};
export const getRequirementInputs = {
  connection: connectionInput,
  requirementGuid: requirementGuidInput,
};
export const listRequirementChildrenInputs = {
  connection: connectionInput,
  requirementGuid: requirementGuidInput,
  view: requirementTreeViewInput,
};
export const getRequirementFileAssociationInputs = {
  connection: connectionInput,
  requirementGuid: requirementGuidInput,
  fileAssociationGuid: requirementFileAssocGuidInput,
};
export const listRequirementFilesInputs = {
  connection: connectionInput,
  requirementGuid: requirementGuidInput,
};
export const listRequirementHistoryInputs = {
  connection: connectionInput,
  requirementGuid: requirementGuidInput,
};
export const getRequirementParentInputs = {
  connection: connectionInput,
  requirementGuid: requirementGuidInput,
};
export const listRequirementQualityInputs = {
  connection: connectionInput,
  requirementGuid: requirementGuidInput,
};
export const getRequirementQualityAssociationInputs = {
  connection: connectionInput,
  requirementGuid: requirementGuidInput,
  associationGuid: requirementQualityAssocGuidInput,
};
export const listRequirementRelationshipTypesInputs = {
  connection: connectionInput,
};
export const listRequirementsInputs = {
  connection: connectionInput,
  number: {
    ...numberInput,
    comments: "Filter by requirement number.",
  },
  title: {
    ...titleInput,
    comments: "Filter by requirement title.",
  },
  status: {
    ...statusInput,
    comments: "Filter by requirement status.",
  },
  assigneeFullName: requirementAssigneeFullNameInput,
  assigneeGuid: {
    ...assigneeGuidInput,
    comments: "Filter by assignee GUID.",
  },
  creatorFullName: creatorFullNameInput,
  creatorGuid: creatorGuidInput,
  modificationDateTime: requirementModificationDateTimeInput,
  priority: {
    ...priorityInput,
    comments: "Filter by priority.",
  },
  description: {
    ...descriptionInput,
    comments: "Filter by description text.",
  },
  any: requirementAnySearchInput,
  templateGuid: requirementTemplateGuidInput,
  fetchAll: fetchAllInput,
  pagination,
};
export const getRequirementTemplateInputs = {
  connection: connectionInput,
  requirementTemplateGuid: requirementTemplateGuidInput,
};
export const listRequirementTemplateAttributesInputs = {
  connection: connectionInput,
  templateGuid: requirementTemplateGuidInput,
  includePossibleValues: requirementTemplateIncludePossibleValuesInput,
  creatableOnly: requirementTemplateCreatableOnlyInput,
  editableOnly: requirementTemplateEditableOnlyInput,
  searchableOnly: requirementTemplateSearchableOnlyInput,
};
export const listRequirementTemplatesInputs = {
  connection: connectionInput,
  name: requirementTemplateNameFilterInput,
  active: requirementTemplateActiveFilterInput,
};
export const getRequirementTicketAssociationInputs = {
  connection: connectionInput,
  requirementGuid: requirementGuidInput,
  associationGuid: requirementTicketAssocGuidInput,
};
export const listRequirementTicketsInputs = {
  connection: connectionInput,
  requirementGuid: requirementGuidInput,
};
export const getRequirementTraceInputs = {
  connection: connectionInput,
  requirementGuid: requirementGuidInput,
  traceLinkGuid: requirementTraceLinkGuidInput,
};
export const listRequirementTracesInputs = {
  connection: connectionInput,
  requirementGuid: requirementGuidInput,
  direction: traceDirectionInput,
  suspect: requirementTraceSuspectInput,
};
export const removeRequirementChildInputs = {
  connection: connectionInput,
  requirementGuid: requirementGuidInput,
  childRequirementGuid: childRequirementGuidInput,
};
export const removeRequirementFileAssociationInputs = {
  connection: connectionInput,
  requirementGuid: requirementGuidInput,
  fileAssociationGuid: requirementFileAssocGuidInput,
};
export const removeRequirementQualityAssociationInputs = {
  connection: connectionInput,
  requirementGuid: requirementGuidInput,
  associationGuid: requirementQualityAssocGuidInput,
};
export const removeRequirementTicketAssociationInputs = {
  connection: connectionInput,
  requirementGuid: requirementGuidInput,
  associationGuid: requirementTicketAssocGuidInput,
};
export const updateRequirementInputs = {
  connection: connectionInput,
  requirementGuid: requirementGuidInput,
  title: requirementUpdateTitleInput,
  description: requirementDescriptionInput,
  priority: requirementPriorityInput,
  assigneeGuid: requirementAssigneeGuidInput,
  setNull: setNullInput,
  additionalAttributes: additionalAttributesInput,
  attributeDefinitions: attributeDefinitionsInput,
  additionalAttributeJson: additionalAttributeJsonInput,
};
export const updateRequirementTraceInputs = {
  connection: connectionInput,
  requirementGuid: requirementGuidInput,
  traceLinkGuid: requirementTraceLinkGuidInput,
  relationshipTypeGuid: requirementTraceRelationshipTypeGuidInput,
  suspected: {
    ...requirementTraceSuspectInput,
    comments: "When true, the trace link is flagged as suspect.",
  },
};
