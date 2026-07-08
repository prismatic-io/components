import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  ATTACHMENT_TYPE_MODEL,
  ATTACHMENT_VISIBILITY_MODEL,
} from "../../constants";
import { toOptionalString } from "../../util/clean";
import { application_id } from "../v1/applications";
import { candidate_ids } from "../v1/candidates";
import {
  connectionInput,
  createdAtGte,
  createdAtLte,
  cursorPaginationInputs,
  updatedAtGte,
  updatedAtLte,
} from "./common";
export const attachmentId = input({
  label: "Attachment ID",
  type: "string",
  required: true,
  comments: "The unique numeric identifier of the attachment to delete.",
  placeholder: "Enter attachment ID",
  example: "4949394",
  clean: util.types.toString,
});
export const applicationId = {
  ...application_id,
  required: true,
  comments: "The ID of the application that will receive this attachment.",
  example: "1003961",
  dataSource: "applicationsV3",
  clean: util.types.toNumber,
};
export const applicationIds = input({
  label: "Application IDs",
  type: "string",
  required: false,
  comments:
    "Comma-separated list of application IDs to filter by. Maximum 50 items.",
  placeholder: "Enter application IDs",
  example: "1003961,1003962",
  clean: toOptionalString,
});
export const candidateIds = {
  ...candidate_ids,
  comments:
    "Comma-separated list of candidate IDs; returns only attachments whose application belongs to one of these candidates. Maximum 50 items.",
};
export const attachmentIds = input({
  label: "Attachment IDs",
  type: "string",
  required: false,
  comments:
    "Comma-separated list of specific attachment IDs to fetch. Maximum 50 items.",
  placeholder: "Enter attachment IDs",
  example: "4949394,4949395",
  clean: toOptionalString,
});
export const attachmentType = input({
  label: "Attachment Type",
  type: "string",
  required: true,
  model: ATTACHMENT_TYPE_MODEL,
  comments:
    "Classification of the document. Determines access defaults and display grouping in Greenhouse.",
  clean: util.types.toString,
});
export const attachmentTypeFilter = input({
  label: "Attachment Type",
  type: "string",
  required: false,
  model: ATTACHMENT_TYPE_MODEL,
  comments:
    "Return only attachments of this type. When omitted, all types are included.",
  clean: toOptionalString,
});
export const filename = input({
  label: "Filename",
  type: "string",
  required: true,
  comments:
    "Name of the file including its extension (e.g. resume.pdf). Certain blocked extensions are rejected by the API.",
  placeholder: "Enter filename",
  example: "jane_doe_resume.pdf",
  clean: util.types.toString,
});
export const fileContent = input({
  label: "File Content (Base64)",
  type: "string",
  required: false,
  comments:
    "Base64-encoded bytes of the file to upload. Provide this OR File URL — not both and not neither.",
  placeholder: "Enter base64-encoded file content",
  example: "JVBERi0xLjQKJ...",
  clean: toOptionalString,
});
export const fileUrl = input({
  label: "File URL",
  type: "string",
  required: false,
  comments:
    "Publicly accessible URL from which Greenhouse will download the file. Provide this OR File Content — not both and not neither.",
  placeholder: "Enter publicly accessible file URL",
  example: "https://cdn.example.com/resumes/jane_doe.pdf",
  clean: toOptionalString,
});
export const visibility = input({
  label: "Visibility",
  type: "string",
  required: false,
  model: ATTACHMENT_VISIBILITY_MODEL,
  comments:
    "Access level for the attachment within Greenhouse. When omitted, the default is inferred from the attachment type.",
  clean: toOptionalString,
});
const idFilters = structuredObjectInput({
  label: "ID Filters",
  required: false,
  comments:
    "Optional filters that narrow results to attachments matching specific record IDs: attachment, application, and candidate IDs. Each accepts a comma-separated list of up to 50 IDs.",
  inputs: { attachmentIds, applicationIds, candidateIds },
});
const dateRangeFilters = structuredObjectInput({
  label: "Date Range Filters",
  required: false,
  comments:
    "Optional inclusive date-range filters. Narrow results by when attachments were created or last updated.",
  inputs: { createdAtGte, createdAtLte, updatedAtGte, updatedAtLte },
});
export const listAttachmentsV3Inputs = {
  connection: connectionInput,
  ...cursorPaginationInputs,
  idFilters,
  attachmentTypeFilter,
  dateRangeFilters,
};
export const createAttachmentV3Inputs = {
  connection: connectionInput,
  applicationId,
  filename,
  attachmentType,
  fileContent,
  fileUrl,
  visibility,
};
export const deleteAttachmentV3Inputs = {
  connection: connectionInput,
  attachmentId,
};
