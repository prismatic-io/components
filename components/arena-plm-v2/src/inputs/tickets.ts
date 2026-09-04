import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import {
  activeInput,
  additionalAttributeJsonInput,
  additionalAttributesInput,
  assigneeGuidInput,
  attributeDefinitionsInput,
  changeGuidInput,
  connectionInput,
  fetchAllInput,
  fileGuidInput,
  itemGuidInput,
  nameInput,
  notesInput,
  numberInput,
  numberSequencePrefixInput,
  pagination,
  priorityInput,
  qualityProcessGuidInput,
  statusInput,
  stepGuidInput,
  templateGuidInput,
  titleInput,
} from "./common";
const ticketGuidInput = input({
  label: "Ticket GUID",
  type: "string",
  required: true,
  placeholder: "Enter ticket GUID",
  comments: "The GUID of the ticket.",
  example: "TK1AB2CD3EF4GH5IJ6KL7MN8",
  clean: util.types.toString,
});
const editionNumberInput = input({
  label: "Edition Number",
  type: "string",
  required: false,
  placeholder: "Enter edition number",
  comments: "Specific edition number of the file (optional).",
  clean: toOptionalString,
});
const latestRevisionAssociationInput = input({
  label: "Latest Revision Association",
  type: "boolean",
  required: false,
  comments:
    "When true, always associates the latest revision of the item rather than a fixed revision.",
  clean: util.types.toBool,
});
const referencedTicketGuidInput = input({
  label: "Referenced Ticket GUID",
  type: "string",
  required: true,
  placeholder: "Enter referenced ticket GUID",
  comments: "The GUID of the ticket to reference.",
  example: "TK1AB2CD3EF4GH5IJ6KL7MN8",
  clean: util.types.toString,
});
const associationGuidInput = input({
  label: "Association GUID",
  type: "string",
  required: true,
  placeholder: "Enter association GUID",
  comments: "The GUID of the association to remove.",
  example: "TK1AB2CD3EF4GH5IJ6KL7MN8",
  clean: util.types.toString,
});
const ticketDescriptionInput = input({
  label: "Description",
  type: "text",
  required: false,
  placeholder: "Enter ticket description",
  comments: "The updated description of the ticket.",
  clean: toOptionalString,
});
const ticketIncludePossibleValuesBoolInput = input({
  label: "Include Possible Values",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, possible values for dropdown attributes are included.",
  clean: util.types.toBool,
});
const ticketCreatableOnlyBoolInput = input({
  label: "Creatable Only",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, only attributes that can be used during creation are shown.",
  clean: util.types.toBool,
});
const ticketEditableOnlyBoolInput = input({
  label: "Editable Only",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, only attributes that can be edited are shown.",
  clean: util.types.toBool,
});
const ticketSearchableOnlyBoolInput = input({
  label: "Searchable Only",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, only searchable attributes are shown.",
  clean: util.types.toBool,
});
const fixVersionInput = input({
  label: "Fix Version",
  type: "string",
  required: false,
  placeholder: "Enter fix version",
  comments: "The fix version for this ticket.",
  clean: toOptionalString,
});
const foundOnInput = input({
  label: "Found On",
  type: "string",
  required: false,
  placeholder: "Enter found-on version",
  comments: "The version on which the issue was found.",
  clean: toOptionalString,
});
export const addTicketChangeInputs = {
  connection: connectionInput,
  ticketGuid: ticketGuidInput,
  changeGuid: {
    ...changeGuidInput,
    comments: "The GUID of the change to link.",
  },
};
export const addTicketFileInputs = {
  connection: connectionInput,
  ticketGuid: ticketGuidInput,
  fileGuid: { ...fileGuidInput, comments: "The GUID of the file to link." },
  editionNumber: editionNumberInput,
};
export const addTicketItemInputs = {
  connection: connectionInput,
  ticketGuid: ticketGuidInput,
  itemGuid: { ...itemGuidInput, comments: "The GUID of the item to link." },
  latestRevisionAssociation: latestRevisionAssociationInput,
};
export const addTicketQualityProcessInputs = {
  connection: connectionInput,
  ticketGuid: ticketGuidInput,
  qualityProcessGuid: {
    ...qualityProcessGuidInput,
    comments: "The GUID of the quality process to link.",
    example: "TK1AB2CD3EF4GH5IJ6KL7MN8",
  },
  stepGuid: {
    ...stepGuidInput,
    comments: "Optional GUID of a specific step within the quality process.",
    example: "def456abc-789-123-jkl-mnopqrs890",
  },
};
export const addTicketReferenceInputs = {
  connection: connectionInput,
  ticketGuid: ticketGuidInput,
  referencedTicketGuid: referencedTicketGuidInput,
};
export const changeTicketStatusInputs = {
  connection: connectionInput,
  ticketGuid: ticketGuidInput,
  status: {
    ...statusInput,
    required: true,
    comments:
      "New status for the ticket (NOT_STARTED, IN_PROGRESS, COMPLETED).",
    clean: util.types.toString,
  },
  notes: {
    ...notesInput,
    placeholder: "Enter status change notes",
    comments: "Optional notes for the status change.",
  },
};
export const createTicketInputs = {
  connection: connectionInput,
  templateGuid: templateGuidInput,
  title: {
    ...titleInput,
    required: true,
    placeholder: "Enter ticket title",
    comments: "The title of the ticket.",
    clean: util.types.toString,
  },
  number: {
    ...numberInput,
    placeholder: "Enter ticket number",
    comments:
      "Custom ticket number (optional - will use template default if not provided).",
  },
  numberSequencePrefix: {
    ...numberSequencePrefixInput,
    comments: "Number sequence prefix for auto-generating ticket number.",
  },
  additionalAttributes: additionalAttributesInput,
  attributeDefinitions: attributeDefinitionsInput,
  additionalAttributeJson: additionalAttributeJsonInput,
};
export const deleteTicketInputs = {
  connection: connectionInput,
  ticketGuid: ticketGuidInput,
};
export const getTicketByGuidInputs = {
  connection: connectionInput,
  ticketGuid: ticketGuidInput,
};
export const listTicketChangesInputs = {
  connection: connectionInput,
  ticketGuid: ticketGuidInput,
};
export const listTicketFilesInputs = {
  connection: connectionInput,
  ticketGuid: ticketGuidInput,
};
export const listTicketItemsInputs = {
  connection: connectionInput,
  ticketGuid: ticketGuidInput,
};
export const listTicketQualityProcessesInputs = {
  connection: connectionInput,
  ticketGuid: ticketGuidInput,
};
export const listTicketReferencesInputs = {
  connection: connectionInput,
  ticketGuid: ticketGuidInput,
};
export const listTicketsInputs = {
  connection: connectionInput,
  number: {
    ...numberInput,
    label: "Ticket Number",
    placeholder: "Enter ticket number",
    comments: "Filter by ticket number.",
  },
  title: {
    ...titleInput,
    label: "Ticket Title",
    placeholder: "Enter ticket title",
    comments: "Filter by ticket title.",
  },
  status: {
    ...statusInput,
    comments:
      "Filter by ticket status (e.g., NOT_STARTED, IN_PROGRESS, COMPLETE).",
  },
  templateGuid: {
    ...templateGuidInput,
    required: false,
    clean: toOptionalString,
    comments: "Filter by template GUID.",
  },
  fetchAll: fetchAllInput,
  pagination,
};
export const listTicketTemplateAttributesInputs = {
  connection: connectionInput,
  templateGuid: templateGuidInput,
  includePossibleValues: ticketIncludePossibleValuesBoolInput,
  creatableOnly: ticketCreatableOnlyBoolInput,
  editableOnly: ticketEditableOnlyBoolInput,
  searchableOnly: ticketSearchableOnlyBoolInput,
};
export const listTicketTemplatesInputs = {
  connection: connectionInput,
  name: {
    ...nameInput,
    label: "Template Name",
    placeholder: "Enter template name",
    comments: "Filter by ticket template name.",
  },
  active: {
    ...activeInput,
    comments: "When true, only active templates are shown.",
  },
};
export const removeTicketChangeInputs = {
  connection: connectionInput,
  ticketGuid: ticketGuidInput,
  associationGuid: {
    ...associationGuidInput,
    comments: "The GUID of the change association to remove.",
  },
};
export const removeTicketFileInputs = {
  connection: connectionInput,
  ticketGuid: ticketGuidInput,
  associationGuid: {
    ...associationGuidInput,
    comments: "The GUID of the file association to remove.",
  },
};
export const removeTicketItemInputs = {
  connection: connectionInput,
  ticketGuid: ticketGuidInput,
  associationGuid: {
    ...associationGuidInput,
    comments: "The GUID of the item association to remove.",
  },
};
export const removeTicketQualityProcessInputs = {
  connection: connectionInput,
  ticketGuid: ticketGuidInput,
  associationGuid: {
    ...associationGuidInput,
    comments: "The GUID of the quality process association to remove.",
  },
};
export const removeTicketReferenceInputs = {
  connection: connectionInput,
  ticketGuid: ticketGuidInput,
  associationGuid: {
    ...associationGuidInput,
    comments: "The GUID of the ticket association to remove.",
  },
};
export const updateTicketInputs = {
  connection: connectionInput,
  ticketGuid: ticketGuidInput,
  title: {
    ...titleInput,
    placeholder: "Enter ticket title",
    comments: "The updated title of the ticket.",
  },
  description: ticketDescriptionInput,
  assigneeGuid: {
    ...assigneeGuidInput,
    placeholder: "Enter assignee user GUID",
    comments: "GUID of the user to assign to this ticket.",
    example: "TK1AB2CD3EF4GH5IJ6KL7MN8",
  },
  fixVersion: fixVersionInput,
  foundOn: foundOnInput,
  priority: {
    ...priorityInput,
    comments: "The priority of the ticket (e.g. HIGH, MEDIUM, LOW).",
  },
  additionalAttributes: additionalAttributesInput,
  attributeDefinitions: attributeDefinitionsInput,
  additionalAttributeJson: additionalAttributeJsonInput,
};
