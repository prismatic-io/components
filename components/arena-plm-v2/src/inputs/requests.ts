import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import {
  additionalAttributeJsonInput,
  additionalAttributesInput,
  attributeDefinitionsInput,
  categoryGuidInput,
  commentInput,
  connectionInput,
  creatableOnlyInput,
  creatorGuidInput,
  editableOnlyInput,
  fetchAllInput,
  fileGuidInput,
  includeChildCategoriesInput,
  includeDeletedInput,
  includeEmptyAdditionalAttributesInput,
  includePossibleValuesInput,
  itemGuidInput,
  notesInput,
  numberInput,
  numberSequencePrefixInput,
  objectTypeInput,
  pagination,
  searchableOnlyInput,
  statusInput,
  titleInput,
} from "./common";
const requestGuidInput = input({
  label: "Request GUID",
  type: "string",
  required: true,
  placeholder: "Enter request GUID",
  comments: "GUID of the request the operation applies to.",
  example: "RQ4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const issueGuidInput = input({
  label: "Issue GUID",
  type: "string",
  required: true,
  placeholder: "Enter issue GUID",
  comments: "GUID of the evaluation issue.",
  example: "RQ4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const responseInput = input({
  label: "Response",
  type: "text",
  required: true,
  placeholder: "Enter a response",
  comments: "Response to the evaluation issue.",
  clean: util.types.toString,
});
const markupGuidInput = input({
  label: "Markup GUID",
  type: "string",
  required: true,
  placeholder: "Enter markup GUID",
  comments: "GUID of the markup to associate with the request.",
  example: "RQ4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const requestFileAssociationGuidInput = input({
  label: "Request File Association GUID",
  type: "string",
  required: true,
  placeholder: "Enter request file association GUID",
  comments: "GUID of the request markup file association to delete.",
  example: "RQ4KL5MN6OP7QR8ST9UV0WX1",
  clean: util.types.toString,
});
const fromStatusInput = input({
  label: "From Status",
  type: "string",
  required: false,
  model: [
    { label: "Unsubmitted", value: "UNSUBMITTED" },
    { label: "Submitted", value: "SUBMITTED" },
    { label: "Promoted", value: "PROMOTED" },
    { label: "Closed", value: "CLOSED" },
    { label: "Deferred", value: "DEFERRED" },
  ],
  comments: "Current status of the request (optional).",
  clean: toOptionalString,
});
const resolutionNotesInput = input({
  label: "Resolution Notes",
  type: "text",
  required: false,
  placeholder: "Enter resolution notes",
  comments: "Notes about the resolution (typically used when closing).",
  clean: toOptionalString,
});
const resolutionCodeInput = input({
  label: "Resolution Code",
  type: "string",
  required: false,
  placeholder: "Enter resolution code",
  comments: "Code indicating the type of resolution.",
  clean: toOptionalString,
});
const deferralCodeInput = input({
  label: "Deferral Code",
  type: "string",
  required: false,
  placeholder: "Enter deferral code",
  comments: "Code indicating the reason for deferral.",
  clean: toOptionalString,
});
const deferDeadlineDateTimeInput = input({
  label: "Defer Deadline Date Time",
  type: "string",
  required: false,
  placeholder: "Enter defer deadline (YYYY-MM-DDTHH:mm:ss.sssZ)",
  comments: "ISO 8601 datetime when the deferred request should be revisited.",
  example: "2026-05-10T09:15:00Z",
  clean: toOptionalString,
});
const problemInput = input({
  label: "Problem Description",
  type: "text",
  required: false,
  placeholder: "Describe the problem",
  comments: "Description of the problem that needs to be addressed.",
  clean: toOptionalString,
});
const requestedActionInput = input({
  label: "Requested Action",
  type: "text",
  required: false,
  placeholder: "Describe the requested action",
  comments: "Description of the action requested to solve the problem.",
  clean: toOptionalString,
});
const evaluatorGroupGuidInput = input({
  label: "Evaluator Group GUID",
  type: "string",
  required: false,
  placeholder: "Enter evaluator group GUID",
  comments: "GUID of the evaluator group for this request.",
  example: "RQ4KL5MN6OP7QR8ST9UV0WX1",
  clean: toOptionalString,
});
const requestCodeInput = input({
  label: "Request Code",
  type: "string",
  required: false,
  placeholder: "Enter request code",
  comments: "Code associated with the request.",
  clean: toOptionalString,
});
const creatorParticipationInput = input({
  label: "Creator Participation",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, the creator participates in the request evaluation.",
  clean: util.types.toBool,
});
const supplierVisibilityInput = input({
  label: "Supplier Visibility",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, the request is visible to suppliers.",
  clean: util.types.toBool,
});
const issueInput = input({
  label: "Issue Description",
  type: "text",
  required: true,
  placeholder: "Describe the evaluation issue",
  comments: "Description of the evaluation issue to create.",
  clean: util.types.toString,
});
const lifecycleStatusInput = input({
  label: "Lifecycle Status",
  type: "string",
  required: false,
  placeholder: "Enter lifecycle status",
  comments:
    "Filter by lifecycle status (e.g., UNSUBMITTED, SUBMITTED, PROMOTED, CLOSED, DEFERRED).",
  clean: toOptionalString,
});
export const addEvaluationIssueResponseInputs = {
  connection: connectionInput,
  requestGuid: {
    ...requestGuidInput,
    comments: "GUID of the request containing the evaluation issue.",
  },
  issueGuid: {
    ...issueGuidInput,
    comments: "GUID of the evaluation issue to respond to.",
  },
  response: responseInput,
};
export const addItemToRequestInputs = {
  connection: connectionInput,
  requestGuid: {
    ...requestGuidInput,
    comments: "GUID of the request to add the item to.",
  },
  itemGuid: {
    ...itemGuidInput,
    comments: "GUID of the item to add to the request.",
  },
  notes: {
    ...notesInput,
    placeholder: "Enter notes about this item association",
    comments: "Optional notes about adding this item to the request.",
  },
};
export const attachFileToRequestInputs = {
  connection: connectionInput,
  requestGuid: {
    ...requestGuidInput,
    comments: "GUID of the request to attach the file to.",
  },
  fileGuid: {
    ...fileGuidInput,
    comments: "GUID of the file to attach to the request.",
  },
};
export const changeEvaluationIssueStatusInputs = {
  connection: connectionInput,
  requestGuid: {
    ...requestGuidInput,
    comments: "GUID of the request containing the evaluation issue.",
  },
  issueGuid: {
    ...issueGuidInput,
    comments: "GUID of the evaluation issue to change status for.",
  },
  status: {
    ...statusInput,
    required: true,
    placeholder: "Select a status",
    model: [
      { label: "Open", value: "OPEN" },
      { label: "Closed", value: "CLOSED" },
    ],
    comments: "New status for the evaluation issue.",
    clean: util.types.toString,
  },
  response: {
    ...responseInput,
    required: false,
    clean: toOptionalString,
    placeholder: "Enter optional response",
    comments: "Optional response when changing the issue status.",
  },
};
export const changeRequestStatusInputs = {
  connection: connectionInput,
  requestGuid: {
    ...requestGuidInput,
    comments: "GUID of the request to change status for.",
  },
  status: {
    ...statusInput,
    label: "New Status",
    required: true,
    placeholder: "Select a status",
    model: [
      { label: "Unsubmitted", value: "UNSUBMITTED" },
      { label: "Submitted", value: "SUBMITTED" },
      { label: "Promoted", value: "PROMOTED" },
      { label: "Closed", value: "CLOSED" },
      { label: "Deferred", value: "DEFERRED" },
    ],
    comments: "New lifecycle status for the request.",
    clean: util.types.toString,
  },
  fromStatus: fromStatusInput,
  comment: {
    ...commentInput,
    placeholder: "Enter comment about the status change",
    comments: "Optional comment about the status change.",
  },
  resolutionNotes: resolutionNotesInput,
  resolutionCode: resolutionCodeInput,
  deferralCode: deferralCodeInput,
  deferDeadlineDateTime: deferDeadlineDateTimeInput,
};
export const createRequestInputs = {
  connection: connectionInput,
  title: {
    ...titleInput,
    label: "Request Title",
    placeholder: "Enter request title",
    comments: "The title of the request.",
  },
  problem: problemInput,
  requestedAction: requestedActionInput,
  categoryGuid: {
    ...categoryGuidInput,
    comments: "GUID of the category to assign to this request.",
  },
  numberSequencePrefix: {
    ...numberSequencePrefixInput,
    comments: "Prefix for the request number sequence.",
  },
  evaluatorGroupGuid: evaluatorGroupGuidInput,
  requestCode: requestCodeInput,
  creatorParticipation: creatorParticipationInput,
  supplierVisibility: supplierVisibilityInput,
  additionalAttributes: additionalAttributesInput,
  attributeDefinitions: attributeDefinitionsInput,
  additionalAttributeJson: additionalAttributeJsonInput,
};
export const createRequestEvaluationIssueInputs = {
  connection: connectionInput,
  requestGuid: {
    ...requestGuidInput,
    comments: "GUID of the request to create the evaluation issue for.",
  },
  issue: issueInput,
  supplierVisibility: {
    ...supplierVisibilityInput,
    comments: "When true, the issue is visible to suppliers.",
  },
};
export const createRequestMarkupFileInputs = {
  connection: connectionInput,
  requestGuid: {
    ...requestGuidInput,
    comments: "GUID of the request to create the markup file for.",
  },
  markupGuid: markupGuidInput,
};
export const deleteRequestInputs = {
  connection: connectionInput,
  requestGuid: {
    ...requestGuidInput,
    comments: "GUID of the request to delete.",
  },
};
export const deleteRequestMarkupFileInputs = {
  connection: connectionInput,
  requestGuid: {
    ...requestGuidInput,
    comments: "GUID of the request containing the markup file.",
  },
  requestFileAssociationGuid: requestFileAssociationGuidInput,
};
export const listEvaluationIssueResponsesInputs = {
  connection: connectionInput,
  requestGuid: {
    ...requestGuidInput,
    comments: "GUID of the request containing the evaluation issue.",
  },
  issueGuid: {
    ...issueGuidInput,
    comments: "GUID of the evaluation issue to get responses for.",
  },
};
export const getRequestByGuidInputs = {
  connection: connectionInput,
  requestGuid: {
    ...requestGuidInput,
    comments: "GUID of the request to retrieve.",
  },
  includeEmptyAdditionalAttributes: includeEmptyAdditionalAttributesInput,
};
export const listRequestAdministratorsInputs = {
  connection: connectionInput,
};
export const listRequestChangesInputs = {
  connection: connectionInput,
  requestGuid: {
    ...requestGuidInput,
    comments: "GUID of the request to get changes for.",
  },
};
export const listRequestEvaluationIssuesInputs = {
  connection: connectionInput,
  requestGuid: {
    ...requestGuidInput,
    comments: "GUID of the request to get evaluation issues for.",
  },
};
export const listRequestEvaluatorGroupsInputs = {
  connection: connectionInput,
};
export const listRequestFilesInputs = {
  connection: connectionInput,
  requestGuid: {
    ...requestGuidInput,
    comments: "GUID of the request to get files for.",
  },
};
export const listRequestItemAttributesInputs = {
  connection: connectionInput,
  includePossibleValues: includePossibleValuesInput,
  creatableOnly: creatableOnlyInput,
  editableOnly: editableOnlyInput,
  searchableOnly: searchableOnlyInput,
  includeDeleted: {
    ...includeDeletedInput,
    comments: "Whether to include deleted attributes.",
  },
};
export const listRequestItemsInputs = {
  connection: connectionInput,
  requestGuid: {
    ...requestGuidInput,
    comments: "GUID of the request to get items for.",
  },
};
export const listRequestMarkupFilesInputs = {
  connection: connectionInput,
  requestGuid: {
    ...requestGuidInput,
    comments: "GUID of the request to get markup files for.",
  },
};
export const listRequestNumberSequencePrefixesInputs = {
  connection: connectionInput,
};
export const listRequestNumberSequencesInputs = {
  connection: connectionInput,
  objectType: {
    ...objectTypeInput,
    placeholder: "Select an object type",
    default: "requests",
    model: [
      { label: "Requests", value: "requests" },
      { label: "Changes", value: "changes" },
      { label: "Quality Processes", value: "qualityprocesses" },
      { label: "Tickets", value: "tickets" },
      { label: "Training Plans", value: "trainingplans" },
      { label: "Requirements", value: "requirements" },
    ],
    comments: "The object type for which to list number sequences.",
  },
};
export const listRequestQualityProcessesInputs = {
  connection: connectionInput,
  requestGuid: {
    ...requestGuidInput,
    comments: "GUID of the request to get quality processes for.",
  },
};
export const listRequestsInputs = {
  connection: connectionInput,
  number: {
    ...numberInput,
    label: "Request Number",
    placeholder: "Enter request number",
    comments: "Filter by request number.",
  },
  title: {
    ...titleInput,
    label: "Request Title",
    placeholder: "Enter request title",
    comments: "Filter by request title.",
  },
  resolutionCode: {
    ...resolutionCodeInput,
    comments: "Filter by resolution code.",
  },
  requestCode: {
    ...requestCodeInput,
    comments: "Filter by request code.",
  },
  lifecycleStatus: lifecycleStatusInput,
  deferralCode: {
    ...deferralCodeInput,
    comments: "Filter by deferral code.",
  },
  creatorGuid: {
    ...creatorGuidInput,
    comments: "Filter by request creator GUID.",
  },
  categoryGuid: {
    ...categoryGuidInput,
    comments: "Filter by request category GUID.",
  },
  includeChildCategories: {
    ...includeChildCategoriesInput,
    comments: "When true, requests from child categories are included.",
  },
  fetchAll: fetchAllInput,
  pagination,
};
export const listRequestStatusChangeAttributesInputs = {
  connection: connectionInput,
};
export const removeFileFromRequestInputs = {
  connection: connectionInput,
  requestGuid: {
    ...requestGuidInput,
    comments: "GUID of the request to remove the file from.",
  },
  requestFileAssociationGuid: {
    ...requestFileAssociationGuidInput,
    comments: "GUID of the request-file association to remove.",
  },
};
export const updateRequestInputs = {
  connection: connectionInput,
  requestGuid: {
    ...requestGuidInput,
    comments: "GUID of the request to update.",
  },
  title: {
    ...titleInput,
    label: "Request Title",
    placeholder: "Enter request title",
    comments: "The title of the request.",
  },
  problem: problemInput,
  requestedAction: requestedActionInput,
  categoryGuid: {
    ...categoryGuidInput,
    comments: "GUID of the category to assign to this request.",
  },
  numberSequencePrefix: {
    ...numberSequencePrefixInput,
    comments: "Prefix for the request number sequence.",
  },
  requestCode: requestCodeInput,
  supplierVisibility: supplierVisibilityInput,
  additionalAttributes: additionalAttributesInput,
  attributeDefinitions: attributeDefinitionsInput,
  additionalAttributeJson: additionalAttributeJsonInput,
};
