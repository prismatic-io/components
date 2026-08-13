import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanCodeInput, cleanStringInput } from "../util";
import { connection, fetchAll, odataParams } from "./common";
const createAccountEnabled = input({
  label: "Account Enabled",
  type: "boolean",
  required: true,
  default: "true",
  comments:
    "When true, enables the user account. When false, the account is disabled and the user cannot sign in.",
  clean: util.types.toBool,
});
const createDisplayName = input({
  label: "Display Name",
  type: "string",
  required: true,
  comments: "The full name shown in the address book and user profile.",
  placeholder: "Enter display name",
  example: "John Doe",
  clean: cleanStringInput,
});
const forceChangePasswordNextSignIn = input({
  label: "Force Change Password Next Sign In",
  type: "boolean",
  required: true,
  default: "true",
  comments:
    "When true, forces the user to change their password on next sign in.",
  clean: util.types.toBool,
});
const password = input({
  label: "Password",
  type: "password",
  required: true,
  comments:
    "The password for the user account. Must meet the organization's password complexity requirements.",
  placeholder: "Enter password",
  clean: cleanStringInput,
});
const createUserPrincipalName = input({
  label: "User Principal Name",
  type: "string",
  required: true,
  comments:
    "The user principal name (username) for the user. This will be combined with the domain to create the full user principal name (e.g., john.doe@contoso.com).",
  example: "john.doe",
  placeholder: "Enter username",
  clean: cleanStringInput,
});
const createDomain = input({
  label: "Domain",
  type: "string",
  required: true,
  comments:
    "The domain for the user. This must be an existing verified domain in the tenant. Use the 'List Domains' action to retrieve available domains.",
  example: "contoso.onmicrosoft.com",
  placeholder: "Enter domain",
  clean: cleanStringInput,
});
const createAdditionalProperties = input({
  label: "Additional Properties",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Additional properties that are not covered by the other inputs. This should be a JSON object and will be merged with the other inputs. See [Microsoft Graph API user properties](https://learn.microsoft.com/en-us/graph/api/resources/user?view=graph-rest-1.0#json-representation) for available fields.",
  clean: cleanCodeInput,
});
export const createUserInputs = {
  connection,
  accountEnabled: createAccountEnabled,
  displayName: createDisplayName,
  forceChangePasswordNextSignIn,
  password,
  userPrincipalName: createUserPrincipalName,
  domain: createDomain,
  additionalProperties: createAdditionalProperties,
};
const deleteUserId = input({
  label: "User ID",
  comments:
    "Unique Identifier for the user to delete. This can be the user's id or userPrincipalName.",
  example: "d36894ae-94ae-d368-ae94-68d3ae9468d3",
  placeholder: "Enter user ID or principal name",
  type: "string",
  required: true,
  clean: cleanStringInput,
});
export const deleteUserInputs = {
  connection,
  userId: deleteUserId,
};
const getUserId = input({
  label: "User ID",
  comments:
    "Unique Identifier for the user to get. This can be the user's id or userPrincipalName.",
  example: "d36894ae-94ae-d368-ae94-68d3ae9468d3",
  placeholder: "Enter user ID or principal name",
  type: "string",
  required: true,
  clean: cleanStringInput,
  dataSource: "selectUser",
});
export const getUserInputs = {
  connection,
  userId: getUserId,
  $select: odataParams.$select,
};
const listPagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page and page-size controls.",
  inputs: {
    $top: odataParams.$top,
    $skip: odataParams.$skip,
    $skipToken: odataParams.$skipToken,
  },
});
const listFilters = structuredObjectInput({
  label: "Filters",
  required: false,
  comments: "Optional query controls to sort and refine the results.",
  inputs: {
    $filter: odataParams.$filter,
    $select: odataParams.$select,
    $expand: odataParams.$expand,
    $orderBy: odataParams.$orderBy,
    $count: odataParams.$count,
    $search: odataParams.$search,
    $format: odataParams.$format,
  },
});
export const listUsersInputs = {
  connection,
  fetchAll,
  pagination: listPagination,
  filters: listFilters,
};
const reprocessUserId = input({
  label: "User ID",
  comments:
    "Unique Identifier for the user to reprocess the license assignment. This can be the user's id or userPrincipalName.",
  example: "d36894ae-94ae-d368-ae94-68d3ae9468d3",
  placeholder: "Enter user ID or principal name",
  type: "string",
  required: true,
  clean: util.types.toString,
});
export const reprocessLicenseAssignmentInputs = {
  connection,
  userId: reprocessUserId,
};
const updateUserId = input({
  label: "User ID",
  comments:
    "Unique identifier for the user to update. This can be the user's ID (UUID format) or userPrincipalName (email format).",
  example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  placeholder: "Enter User ID or userPrincipalName",
  type: "string",
  required: true,
  clean: cleanStringInput,
});
const updateAccountEnabled = input({
  label: "Account Enabled",
  type: "boolean",
  required: true,
  default: "true",
  comments:
    "When true, enables the user account. When false, the account is disabled and the user cannot sign in.",
  clean: util.types.toBool,
});
const updateDisplayName = input({
  label: "Display Name",
  type: "string",
  required: true,
  comments: "The full name shown in the address book and user profile.",
  placeholder: "Enter display name",
  example: "John Doe",
  clean: cleanStringInput,
});
const updateUserPrincipalName = input({
  label: "User Principal Name",
  type: "string",
  required: false,
  comments:
    "The updated user principal name (username) for the user. This will be combined with the domain to create the full user principal name. Required if 'Domain' input is provided.",
  example: "john.doe",
  placeholder: "Enter username",
  clean: cleanStringInput,
});
const updateDomain = input({
  label: "Domain",
  type: "string",
  required: false,
  comments:
    "The updated domain for the user. This must be an existing verified domain in the tenant. Use the 'List Domains' action to retrieve available domains. Required if 'User Principal Name' input is provided.",
  example: "contoso.onmicrosoft.com",
  placeholder: "Enter domain",
  clean: cleanStringInput,
});
const givenName = input({
  label: "First Name",
  type: "string",
  required: false,
  comments: "The updated first name of the user.",
  placeholder: "Enter first name",
  example: "John",
  clean: cleanStringInput,
});
const surname = input({
  label: "Last Name",
  type: "string",
  required: false,
  comments: "The updated last name of the user.",
  placeholder: "Enter last name",
  example: "Doe",
  clean: cleanStringInput,
});
const jobTitle = input({
  label: "Job Title",
  type: "string",
  required: false,
  comments: "The updated job title of the user.",
  placeholder: "Enter job title",
  example: "Software Engineer",
  clean: cleanStringInput,
});
const updateAdditionalProperties = input({
  label: "Additional Properties",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Additional properties to update that are not covered by the other inputs. This should be a JSON object and will be merged with the other inputs. See [Microsoft Graph API user properties](https://learn.microsoft.com/en-us/graph/api/resources/user?view=graph-rest-1.0#json-representation) for available fields.",
  clean: cleanCodeInput,
});
const name = structuredObjectInput({
  label: "Name",
  required: false,
  comments: "First and last name.",
  inputs: {
    givenName,
    surname,
  },
});
export const updateUserInputs = {
  connection,
  userId: updateUserId,
  accountEnabled: updateAccountEnabled,
  displayName: updateDisplayName,
  userPrincipalName: updateUserPrincipalName,
  domain: updateDomain,
  name,
  jobTitle,
  additionalProperties: updateAdditionalProperties,
};
