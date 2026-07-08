import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  toNumberArray,
  toOptionalBoolean,
  toOptionalObject,
  toOptionalString,
} from "../../util/clean";
import {
  addresses,
  candidate_id,
  candidate_ids,
  company,
  email_addresses,
  is_private,
  phone_numbers,
  social_media_addresses,
  tags,
  title,
  website_addresses,
} from "../v1/candidates";
import { email, first_name, last_name } from "../v1/common";
import {
  connectionInput,
  createdAtGte,
  createdAtLte,
  cursorPaginationInputs,
  customFieldsV3,
  updatedAtGte,
  updatedAtLte,
} from "./common";
export const candidateId = {
  ...candidate_id,
  required: true,
  dataSource: "candidatesV3",
  clean: util.types.toString,
};
export const candidateIds = {
  ...candidate_ids,
  comments:
    "The comma-separated list of candidate IDs to return (e.g. '123,456,789'). A maximum of 50 candidates can be returned this way.",
};
export const candidateEmail = {
  ...email,
  comments:
    "Return only candidates who have this email address on their profile (exact match).",
};
export const firstName = {
  ...first_name,
  comments: "The candidate's legal first name.",
};
export const lastName = {
  ...last_name,
  comments: "The candidate's legal last name.",
};
export const firstNameOptional = {
  ...first_name,
  required: false,
  comments: "The candidate's legal first name. If provided, cannot be blank.",
  clean: toOptionalString,
};
export const lastNameOptional = {
  ...last_name,
  required: false,
  comments: "The candidate's legal last name. If provided, cannot be blank.",
  clean: toOptionalString,
};
export const tag = input({
  label: "Tag",
  type: "string",
  required: false,
  comments: "Filter by candidate tag name (exact match).",
  placeholder: "Enter tag name",
  example: "Senior",
  clean: toOptionalString,
});
export const isPrivate = input({
  label: "Include Private Candidates",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true (default), private candidates are included in results. Set to false to return only non-private candidates.",
  clean: toOptionalBoolean,
});
export const preferredName = input({
  label: "Preferred Name",
  type: "string",
  required: false,
  comments:
    "Preferred or chosen name the candidate goes by, when different from their legal first name.",
  placeholder: "Enter preferred name",
  example: "Jay",
  clean: toOptionalString,
});
export const timeZone = input({
  label: "Time Zone",
  type: "string",
  required: false,
  comments:
    'Rails-style timezone identifier. Example values: "Eastern Time (US & Canada)", "Pacific Time (US & Canada)", "UTC".',
  placeholder: "Enter time zone",
  example: "Eastern Time (US & Canada)",
  clean: toOptionalString,
});
export const canEmail = input({
  label: "Can Email",
  type: "boolean",
  required: false,
  comments:
    "Whether the candidate consented to receive email communication. Defaults to true when omitted.",
  clean: toOptionalBoolean,
});
export const linkedUserIds = input({
  label: "Linked User IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Array of Greenhouse user IDs to link to this candidate. Replaces all existing linked users when provided.",
  placeholder: "Enter a user ID",
  example: "92120",
  clean: toNumberArray,
});
export const application = input({
  label: "Application",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Optional JSON object to create an application alongside the candidate. For a job applicant, include 'job_id' (integer). For a prospect, include 'prospect: true'. Recruiter, coordinator, source, and stage IDs live here in v3 (not on the top-level candidate). Omit to create a candidate without an application.",
  example: JSON.stringify({ job_id: 215725, recruiter_id: 92120 }, null, 2),
  clean: toOptionalObject,
});
const nameInformation = structuredObjectInput({
  label: "Name Information",
  required: false,
  comments: "The candidate's first name, last name, and preferred name.",
  inputs: { firstNameOptional, lastNameOptional, preferredName },
});
const contactInformation = structuredObjectInput({
  label: "Contact Information",
  required: false,
  comments:
    "The candidate's contact details: phone numbers, addresses, email addresses, website addresses, and social media addresses.",
  inputs: {
    phoneNumbers: phone_numbers,
    addresses,
    emailAddresses: email_addresses,
    websiteAddresses: website_addresses,
    socialMediaAddresses: social_media_addresses,
  },
});
const dateRangeFilters = structuredObjectInput({
  label: "Date Range Filters",
  required: false,
  comments:
    "Optional inclusive date-range filters. Narrow results by when candidates were created or last updated.",
  inputs: { createdAtGte, createdAtLte, updatedAtGte, updatedAtLte },
});
export const listCandidatesV3Inputs = {
  connection: connectionInput,
  ...cursorPaginationInputs,
  candidateIds,
  email: candidateEmail,
  tag,
  isPrivate,
  dateRangeFilters,
};
export const getCandidateV3Inputs = {
  connection: connectionInput,
  candidateId,
};
export const createCandidateV3Inputs = {
  connection: connectionInput,
  firstName,
  lastName,
  preferredName,
  company,
  title,
  timeZone,
  canEmail,
  contactInformation,
  tags,
  linkedUserIds,
  customFields: customFieldsV3,
  application,
};
export const editCandidateV3Inputs = {
  connection: connectionInput,
  candidateId,
  nameInformation,
  contactInformation,
  company,
  title,
  timeZone,
  canEmail,
  isPrivateCandidate: is_private,
  tags,
  linkedUserIds,
  customFields: customFieldsV3,
};
export const deleteCandidateV3Inputs = {
  connection: connectionInput,
  candidateId,
};
