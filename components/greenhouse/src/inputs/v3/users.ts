import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  toOptionalBoolean,
  toOptionalString,
  toStringArray,
} from "../../util/clean";
import { first_name, last_name } from "../v1/common";
import { employee_id, send_email_invite } from "../v1/users";
import {
  connectionInput,
  createdAtGte,
  createdAtLte,
  cursorPaginationInputs,
  customFieldsV3,
  updatedAtGte,
  updatedAtLte,
} from "./common";
export const userId = input({
  label: "User ID",
  type: "string",
  required: true,
  comments: "The numeric Greenhouse user ID.",
  placeholder: "Enter user ID",
  example: "92120",
  clean: util.types.toString,
  dataSource: "usersV3",
});
export const ids = input({
  label: "User IDs",
  type: "string",
  required: false,
  comments:
    "Comma-separated list of specific user IDs to fetch. Maximum 50 items.",
  placeholder: "Enter user IDs",
  example: "92120,92121",
  clean: toOptionalString,
});
export const officeIds = input({
  label: "Office IDs",
  type: "string",
  required: false,
  comments:
    "Comma-separated list of Greenhouse office IDs to filter by. Maximum 50 items.",
  placeholder: "Enter office IDs",
  example: "50891,50892",
  clean: toOptionalString,
});
export const departmentIds = input({
  label: "Department IDs",
  type: "string",
  required: false,
  comments:
    "Comma-separated list of Greenhouse department IDs to filter by. Maximum 50 items.",
  placeholder: "Enter department IDs",
  example: "650,651",
  clean: toOptionalString,
});
export const deactivated = input({
  label: "Deactivated",
  type: "boolean",
  required: false,
  comments:
    "When set, filters users by activation state. Omit to return both active and deactivated users.",
  clean: toOptionalBoolean,
});
export const primaryEmail = input({
  label: "Primary Email",
  type: "string",
  required: false,
  comments: "Exact-match filter on the user's primary email address.",
  placeholder: "Enter email address",
  example: "john.doe@example.com",
  clean: toOptionalString,
});
export const showServiceAccounts = input({
  label: "Show Service Accounts",
  type: "boolean",
  required: false,
  comments:
    "When true, includes integration and service-account users in results. Defaults to false.",
  default: "false",
  clean: util.types.toBool,
});
export const firstName = {
  ...first_name,
  comments: "The user's first name (max 255 characters).",
};
export const lastName = {
  ...last_name,
  comments: "The user's last name (max 255 characters).",
};
export const firstNameOptional = {
  ...first_name,
  required: false,
  comments:
    "The user's first name (max 255 characters). If provided, cannot be blank.",
  clean: toOptionalString,
};
export const lastNameOptional = {
  ...last_name,
  required: false,
  comments:
    "The user's last name (max 255 characters). If provided, cannot be blank.",
  clean: toOptionalString,
};
export const sendEmailInvite = {
  ...send_email_invite,
  required: false,
  default: "false",
  comments:
    "When true, Greenhouse sends the new user an invitation email to set a password and sign in. Defaults to false.",
};
export const employeeId = {
  ...employee_id,
  comments:
    "External employee identifier (e.g. HRIS or payroll ID, max 255 characters). Must be unique within the organization.",
};
export const primaryEmailRequired = input({
  label: "Primary Email",
  type: "string",
  required: true,
  comments:
    "Primary email address for the new user — used as the sign-in identifier and for Greenhouse invitation mail. Must be unique within the organization.",
  placeholder: "Enter email address",
  example: "john.doe@example.com",
  clean: util.types.toString,
});
export const primaryEmailOptional = input({
  label: "Primary Email",
  type: "string",
  required: false,
  comments:
    "New primary email — must already be a verified email address on the user's account.",
  placeholder: "Enter email address",
  example: "john.doe@example.com",
  clean: toOptionalString,
});
export const jobTitle = input({
  label: "Job Title",
  type: "string",
  required: false,
  comments:
    "Free-form job title displayed on the user's Greenhouse profile (max 255 characters).",
  placeholder: "Enter job title",
  example: "Senior Recruiter",
  clean: toOptionalString,
});
export const officeIdsWrite = input({
  label: "Office IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Greenhouse office IDs to assign to this user. Replaces all current assignments. Mutually exclusive with External Office IDs.",
  placeholder: "Enter office ID",
  example: "50891",
  clean: toStringArray,
});
export const externalOfficeIds = input({
  label: "External Office IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "External office identifiers (from your HRIS). Replaces all current assignments. Mutually exclusive with Office IDs.",
  placeholder: "Enter external office ID",
  example: "ext-office-boston",
  clean: toStringArray,
});
export const departmentIdsWrite = input({
  label: "Department IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Greenhouse department IDs to assign to this user. Replaces all current assignments. Mutually exclusive with External Department IDs.",
  placeholder: "Enter department ID",
  example: "650",
  clean: toStringArray,
});
export const externalDepartmentIds = input({
  label: "External Department IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "External department identifiers (from your HRIS). Replaces all current assignments. Mutually exclusive with Department IDs.",
  placeholder: "Enter external department ID",
  example: "ext-dept-engineering",
  clean: toStringArray,
});
export const interviewerTagIds = input({
  label: "Interviewer Tag IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "IDs of interviewer tags to apply to this user. For edit operations, replaces all current tags.",
  placeholder: "Enter interviewer tag ID",
  example: "42",
  clean: toStringArray,
});
const idFilters = structuredObjectInput({
  label: "ID Filters",
  required: false,
  comments:
    "Optional filters that narrow results to users matching specific record IDs: user, office, and department IDs. Each accepts a comma-separated list of up to 50 IDs.",
  inputs: { ids, officeIds, departmentIds },
});
const dateRangeFilters = structuredObjectInput({
  label: "Date Range Filters",
  required: false,
  comments:
    "Optional inclusive date-range filters. Narrow results by when users were created or last updated.",
  inputs: { createdAtGte, createdAtLte, updatedAtGte, updatedAtLte },
});
export const listUsersV3Inputs = {
  connection: connectionInput,
  ...cursorPaginationInputs,
  idFilters,
  deactivated,
  primaryEmail,
  showServiceAccounts,
  dateRangeFilters,
};
export const getUserV3Inputs = {
  connection: connectionInput,
  userId,
};
export const createUserV3Inputs = {
  connection: connectionInput,
  firstName,
  lastName,
  primaryEmailRequired,
  sendEmailInvite,
  jobTitle,
  employeeId,
  officeIdsWrite,
  externalOfficeIds,
  departmentIdsWrite,
  externalDepartmentIds,
  interviewerTagIds,
  customFields: {
    ...customFieldsV3,
    example: '[{"name_key": "t_shirt_size", "value": "L"}]',
  },
};
export const editUserV3Inputs = {
  connection: connectionInput,
  userId,
  firstNameOptional,
  lastNameOptional,
  primaryEmailOptional,
  jobTitle,
  employeeId,
  officeIdsWrite,
  externalOfficeIds,
  departmentIdsWrite,
  externalDepartmentIds,
  interviewerTagIds,
  customFields: {
    ...customFieldsV3,
    example: '[{"name_key": "t_shirt_size", "value": "L"}]',
  },
};
export const activateUserV3Inputs = {
  connection: connectionInput,
  userId,
};
export const deactivateUserV3Inputs = {
  connection: connectionInput,
  userId,
};
