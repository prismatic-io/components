import { input, util } from "@prismatic-io/spectral";
import { toObjectOrEmpty, toOptionalString } from "../util";
import {
  additionalFields,
  connection,
  fetchAll,
  issueIdOrKey,
  limit,
  requestTypeId,
  serviceDeskId,
  start,
} from "./common";

const requestSummary = input({
  label: "Summary",
  type: "string",
  required: true,
  comments: "A brief, one-line subject shown in the portal and issue list.",
  placeholder: "Enter request summary",
  example: "Laptop won't start",
  clean: util.types.toString,
});

const requestDescription = input({
  label: "Description",
  type: "string",
  required: false,
  comments:
    "Additional detail about the request. Displayed on the request view for agents and customers.",
  placeholder: "Enter request description",
  example: "My laptop stopped responding after the latest update.",
  clean: toOptionalString,
});

const requestFieldValues = input({
  label: "Field Values",
  type: "code",
  language: "json",
  required: false,
  comments:
    "JSON object of additional request field values required by the request type. Keys are field IDs.",
  placeholder: "Enter field values as JSON",
  example: '{"priority": {"name": "High"}, "customfield_10010": "value"}',
  clean: toObjectOrEmpty,
});

const raiseOnBehalfOf = input({
  label: "Raise On Behalf Of",
  type: "string",
  required: false,
  comments:
    "The accountId of the customer to raise the request on behalf of. If omitted, the request is raised by the authenticated user.",
  placeholder: "Enter account ID",
  example: "5b10ac8d82e05b22cc7d4ef5",
  clean: toOptionalString,
});

const commentBody = input({
  label: "Comment Body",
  type: "string",
  required: true,
  comments:
    "The message to post on the request. Supports plain text and is rendered in the customer portal.",
  placeholder: "Enter comment text",
  example: "We are investigating the issue and will update you shortly.",
  clean: util.types.toString,
});

const publicComment = input({
  label: "Public",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, the comment is visible to the customer. When false, the comment is internal only.",
  clean: util.types.toBool,
});

const approvalId = input({
  label: "Approval ID",
  type: "string",
  required: true,
  comments:
    "The ID of the approval to respond to. Use the List Approvals action or the Approval data source to find this value.",
  placeholder: "Enter approval ID",
  example: "1",
  dataSource: "selectApproval",
  clean: util.types.toString,
});

const approvalDecision = input({
  label: "Decision",
  type: "string",
  required: true,
  model: [
    { label: "Approve", value: "approve" },
    { label: "Decline", value: "decline" },
  ],
  comments: "Whether to approve or decline the request.",
  placeholder: "Select decision",
  clean: util.types.toString,
});

const transitionId = input({
  label: "Transition ID",
  type: "string",
  required: true,
  comments:
    "The ID of the transition to apply. Use the List Transitions action or the Transition data source to find available transitions.",
  placeholder: "Enter transition ID",
  example: "5",
  dataSource: "selectTransition",
  clean: util.types.toString,
});

const commentOnTransition = input({
  label: "Comment",
  type: "string",
  required: false,
  comments:
    "A message posted on the request when the transition is executed. Visible to the customer by default.",
  placeholder: "Enter transition comment",
  clean: toOptionalString,
});

const attachmentTemporaryFileId = input({
  label: "Temporary File ID",
  type: "string",
  required: true,
  comments:
    "The ID of the temporary file previously uploaded via the Upload Attachment action.",
  placeholder: "Enter temporary file ID",
  example: "temp:123456",
  clean: util.types.toString,
});

const fileContents = input({
  label: "File Contents",
  placeholder: "Output data from previous step",
  type: "data",
  required: true,
  comments:
    "The contents of the file to upload. Can be a string or binary data (e.g., image or PDF) from a previous step.",
  example: "My File Contents",
  clean: util.types.toBufferDataPayload,
});

const fileName = input({
  label: "File Name",
  type: "string",
  required: true,
  comments:
    "The filename to associate with the uploaded attachment, including the extension (e.g., report.pdf).",
  placeholder: "Enter file name",
  example: "atlassian.png",
  clean: util.types.toString,
});

export const createRequestInputs = {
  connection,
  serviceDeskId,
  requestTypeId,
  requestSummary,
  requestDescription,
  requestFieldValues,
  raiseOnBehalfOf,
  additionalFields,
};

export const getRequestInputs = {
  connection,
  issueIdOrKey,
};

export const listRequestsInputs = {
  connection,
  serviceDeskId,
  fetchAll,
  start,
  limit,
};

export const listCommentsInputs = {
  connection,
  issueIdOrKey,
  fetchAll,
  start,
  limit,
};

export const addCommentInputs = {
  connection,
  issueIdOrKey,
  commentBody,
  publicComment,
};

export const listApprovalsInputs = {
  connection,
  issueIdOrKey,
  fetchAll,
  start,
  limit,
};

export const approveRequestInputs = {
  connection,
  issueIdOrKey,
  approvalId,
  approvalDecision,
};

export const listTransitionsInputs = {
  connection,
  issueIdOrKey,
  fetchAll,
  start,
  limit,
};

export const transitionRequestInputs = {
  connection,
  issueIdOrKey,
  transitionId,
  commentOnTransition,
};

export const listSlaInputs = {
  connection,
  issueIdOrKey,
  fetchAll,
  start,
  limit,
};

export const uploadTemporaryFileInputs = {
  connection,
  serviceDeskId,
  fileContents,
  fileName,
};

export const addAttachmentInputs = {
  connection,
  issueIdOrKey,
  attachmentTemporaryFileId,
};
