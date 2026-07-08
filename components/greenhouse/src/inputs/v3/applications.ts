import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  toOptionalBoolean,
  toOptionalNumber,
  toOptionalString,
} from "../../util/clean";
import {
  application_id,
  prospect_pool_id,
  prospect_stage_id,
  source_id,
} from "../v1/applications";
import { candidate_ids } from "../v1/candidates";
import { status } from "../v1/common";
import {
  connectionInput,
  createTimestampOperatorInput,
  createdAtGte,
  createdAtLte,
  cursorPaginationInputs,
  customFieldsV3,
  updatedAtGte,
  updatedAtLte,
} from "./common";
export const applicationId = {
  ...application_id,
  required: true,
  example: "69306314",
  dataSource: "applicationsV3",
  clean: util.types.toString,
};
const ids = input({
  label: "Application IDs",
  type: "string",
  required: false,
  comments:
    "Comma-separated list of specific application IDs to fetch. Maximum 50 items.",
  placeholder: "Enter application IDs",
  example: "69306314,69306315",
  clean: toOptionalString,
});
const candidateIds = {
  ...candidate_ids,
  comments:
    "Comma-separated list of candidate IDs to filter by. Maximum 50 items.",
  example: "57683957,57683958",
};
const jobIds = input({
  label: "Job IDs",
  type: "string",
  required: false,
  comments:
    "Comma-separated list of current job (hiring plan) IDs to filter by. Maximum 50 items.",
  placeholder: "Enter job IDs",
  example: "123456,123457",
  clean: toOptionalString,
});
const prospectiveJobIds = input({
  label: "Prospective Job IDs",
  type: "string",
  required: false,
  comments:
    "Comma-separated list of prospective job placement IDs to filter by. Maximum 50 items.",
  placeholder: "Enter prospective job IDs",
  example: "123456,123457",
  clean: toOptionalString,
});
const jobPostIds = input({
  label: "Job Post IDs",
  type: "string",
  required: false,
  comments:
    "Comma-separated list of job post IDs to filter by. Maximum 50 items.",
  placeholder: "Enter job post IDs",
  example: "234567,234568",
  clean: toOptionalString,
});
const sourceIds = input({
  label: "Source IDs",
  type: "string",
  required: false,
  comments:
    "Comma-separated list of source IDs to filter by. Maximum 50 items.",
  placeholder: "Enter source IDs",
  example: "2,3",
  clean: toOptionalString,
});
const referrerIds = input({
  label: "Referrer IDs",
  type: "string",
  required: false,
  comments:
    "Comma-separated list of referrer IDs to filter by. Maximum 50 items.",
  placeholder: "Enter referrer IDs",
  example: "4080,4081",
  clean: toOptionalString,
});
const stageIds = input({
  label: "Stage IDs",
  type: "string",
  required: false,
  comments:
    "Comma-separated list of interview stage IDs to filter by. Maximum 50 items.",
  placeholder: "Enter stage IDs",
  example: "1109787,1109788",
  clean: toOptionalString,
});
const stageName = input({
  label: "Stage Name",
  type: "string",
  required: false,
  comments:
    "Filter by interview stage name. Match is exact and case-sensitive.",
  placeholder: "Enter stage name",
  example: "Application Review",
  clean: toOptionalString,
});
const prospect = input({
  label: "Prospect",
  type: "boolean",
  required: false,
  comments:
    "When true, returns only prospect applications. When false, returns only candidate applications. Omit to return both.",
  clean: toOptionalBoolean,
});
export const lastActivityAtGte = createTimestampOperatorInput(
  "last_activity_at",
  "Last Activity",
  "gte",
);
export const lastActivityAtLte = createTimestampOperatorInput(
  "last_activity_at",
  "Last Activity",
  "lte",
);
const referrerId = input({
  label: "Referrer ID",
  type: "string",
  required: false,
  comments: "The numeric ID of the referrer.",
  placeholder: "Enter referrer ID",
  example: "4080",
  clean: toOptionalNumber,
});
const recruiterId = input({
  label: "Recruiter ID",
  type: "string",
  required: false,
  comments: "The numeric Greenhouse user ID of the assigned recruiter.",
  placeholder: "Enter recruiter user ID",
  example: "92120",
  clean: toOptionalNumber,
});
const coordinatorId = input({
  label: "Coordinator ID",
  type: "string",
  required: false,
  comments: "The numeric Greenhouse user ID of the assigned coordinator.",
  placeholder: "Enter coordinator user ID",
  example: "92121",
  clean: toOptionalNumber,
});
const rejectedAt = input({
  label: "Rejected At",
  type: "string",
  required: false,
  comments: "The rejection date for this application. Format: ISO-8601 date.",
  placeholder: "Enter rejection date",
  example: "2026-06-01",
  clean: toOptionalString,
});
export const rejectionReasonId = input({
  label: "Rejection Reason ID",
  type: "string",
  required: true,
  comments:
    "The numeric ID of the rejection reason. Required by the Harvest v3 reject endpoint.",
  placeholder: "Enter rejection reason ID",
  example: "14",
  dataSource: "rejectionReasonsV3",
  clean: util.types.toString,
});
const rejectionNotes = input({
  label: "Rejection Notes",
  type: "string",
  required: false,
  comments: "Additional context about the rejection decision.",
  placeholder: "Enter rejection notes",
  example: "Candidate did not meet the technical requirements.",
  clean: toOptionalString,
});
const sendEmailAt = input({
  label: "Send Email At",
  type: "string",
  required: false,
  comments:
    "Schedule the rejection email for a future timestamp. Format: ISO-8601 date-time.",
  placeholder: "Enter send timestamp",
  example: "2026-06-10T09:00:00Z",
  clean: toOptionalString,
});
const emailTemplateId = input({
  label: "Email Template ID",
  type: "string",
  required: false,
  comments:
    "The numeric ID of the email template to use for the rejection message.",
  placeholder: "Enter email template ID",
  example: "9876",
  clean: toOptionalNumber,
});
const emailFromUserId = input({
  label: "Email From User ID",
  type: "string",
  required: false,
  comments:
    "The numeric Greenhouse user ID to send the rejection email on behalf of.",
  placeholder: "Enter sender user ID",
  example: "92120",
  clean: toOptionalNumber,
});
const idFilters = structuredObjectInput({
  label: "ID Filters",
  required: false,
  comments:
    "Optional filters that narrow results to applications matching specific record IDs: application, candidate, job, prospective job, job post, source, referrer, and stage IDs. Each accepts a comma-separated list of up to 50 IDs.",
  inputs: {
    ids,
    candidateIds,
    jobIds,
    prospectiveJobIds,
    jobPostIds,
    sourceIds,
    referrerIds,
    stageIds,
  },
});
const dateRangeFilters = structuredObjectInput({
  label: "Date Range Filters",
  required: false,
  comments:
    "Optional inclusive date-range filters. Narrow results by when applications were created, last updated, or last active.",
  inputs: {
    createdAtGte,
    createdAtLte,
    updatedAtGte,
    updatedAtLte,
    lastActivityAtGte,
    lastActivityAtLte,
  },
});
const assignmentIds = structuredObjectInput({
  label: "Assignment IDs",
  required: false,
  comments:
    "Greenhouse IDs to associate with the application: source, referrer, recruiter, coordinator, prospect pool, and prospect stage IDs.",
  inputs: {
    sourceId: source_id,
    referrerId,
    recruiterId,
    coordinatorId,
    prospectPoolId: prospect_pool_id,
    prospectStageId: prospect_stage_id,
  },
});
const rejectionEmail = structuredObjectInput({
  label: "Rejection Email",
  required: false,
  comments:
    "Optional rejection email settings: when to send, which template to use, and which user to send it from. Provide at least one value to send a rejection email.",
  inputs: { sendEmailAt, emailTemplateId, emailFromUserId },
});
export const listApplicationsV3Inputs = {
  connection: connectionInput,
  ...cursorPaginationInputs,
  idFilters,
  status,
  stageName,
  prospect,
  dateRangeFilters,
};
export const getApplicationV3Inputs = {
  connection: connectionInput,
  applicationId,
};
export const editApplicationV3Inputs = {
  connection: connectionInput,
  applicationId,
  assignmentIds,
  rejectedAt,
  customFields: customFieldsV3,
};
export const deleteApplicationV3Inputs = {
  connection: connectionInput,
  applicationId,
};
export const rejectApplicationV3Inputs = {
  connection: connectionInput,
  applicationId,
  rejectionReasonId,
  rejectionNotes,
  rejectionEmail,
  customFields: customFieldsV3,
};
export const unrejectApplicationV3Inputs = {
  connection: connectionInput,
  applicationId,
};
