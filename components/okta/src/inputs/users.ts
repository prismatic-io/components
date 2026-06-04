import { input, util } from "@prismatic-io/spectral";
import { cleanObject, cleanString } from "../util/clean";
import { connection, expand, extraBody, listInputs } from "./general";

export const id = input({
  label: "ID",
  type: "string",
  required: true,
  placeholder: "Enter User ID",
  example: "00u1abcd2EFGHijkL3m4",
  comments:
    "An ID, login, or login shortname (as long as the shortname is unambiguous) of an existing Okta user.",
  clean: util.types.toString,
});

export const userId = input({
  label: "User ID",
  type: "string",
  required: true,
  placeholder: "Enter User ID",
  example: "00u1abcd2EFGHijkL3m4",
  comments: "ID of an existing Okta user.",
  dataSource: "selectUser",
  clean: util.types.toString,
});

export const sendEmail = input({
  label: "Send Email",
  type: "boolean",
  required: false,
  comments: "When true, sends a deactivation email to the admin.",
  clean: util.types.toBool,
});

export const login = input({
  label: "Login",
  type: "string",
  required: true,
  example: "johndoe",
  comments: "The unique identifier for the user (username).",
  placeholder: "Enter login",
  clean: util.types.toString,
});

export const employeeNumber = input({
  label: "Employee Number",
  type: "string",
  required: true,
  example: "12345",
  comments: "The user's employee number.",
  placeholder: "Enter employee number",
  clean: util.types.toString,
});

export const department = input({
  label: "Department",
  type: "string",
  required: true,
  example: "Engineering",
  comments: "The user's department.",
  placeholder: "Enter department",
  clean: util.types.toString,
});

export const locale = input({
  label: "Locale",
  type: "string",
  required: true,
  example: "en_US",
  default: "en_US",
  comments:
    "The user's default location for purposes of localizing items such as currency, date time format, numerical representations, and so on. A locale value is a concatenation of the ISO 639-1 two-letter language code, an underscore, and the ISO 3166-1 two-letter country code.",
  placeholder: "Enter the user's locale",
  clean: util.types.toString,
});

export const firstName = input({
  label: "First Name",
  type: "string",
  required: false,
  example: "John",
  comments: "The user's first name.",
  placeholder: "Enter first name",
  clean: cleanString,
});

export const lastName = input({
  label: "Last Name",
  type: "string",
  required: false,
  example: "Doe",
  comments: "The user's last name.",
  placeholder: "Enter last name",
  clean: cleanString,
});

export const email = input({
  label: "Email",
  type: "string",
  required: true,
  example: "john.doe@example.com",
  comments: "The user's email address.",
  placeholder: "Enter email address",
  clean: util.types.toString,
});

export const mobilePhone = input({
  label: "Mobile Phone",
  type: "string",
  required: false,
  example: "15551234567",
  comments: "The user's mobile phone number.",
  placeholder: "Enter mobile phone number",
  clean: cleanString,
});

export const password = input({
  label: "Password",
  type: "password",
  required: false,
  comments: "The user's password. If not provided, an activation email will be sent to the user.",
  example: "P@ssw0rd!",
  placeholder: "Enter password",
  clean: cleanString,
});

export const hashPassword = input({
  label: "Hash Password",
  type: "code",
  language: "json",
  required: false,
  comments: "The user's password hash.",
  example: JSON.stringify(
    {
      algorithm: "BCRYPT",
      digestAlgorithm: "SHA256_HMAC",
      value: "abC1234Efgh5678Ijkl90mnOpqrstuVwXyz==",
    },
    null,
    2,
  ),
  placeholder: "Enter the hash password",
  clean: cleanString,
});

export const question = input({
  label: "Question",
  type: "string",
  required: false,
  comments: "The user's recovery question.",
  example: "What is your favorite color?",
  placeholder: "Enter recovery question",
  clean: cleanString,
});

export const answer = input({
  label: "Answer",
  type: "string",
  required: false,
  comments: "The user's recovery answer.",
  example: "Blue",
  placeholder: "Enter recovery answer",
  clean: cleanString,
});

export const groupIds = input({
  label: "Group IDs",
  type: "code",
  language: "json",
  required: false,
  comments: "List of group IDs to assign the user to.",
  example: JSON.stringify(["00g1abcd2EFGHijkL3m4", "00g5mnop6QRSTuvwx7y8"], null, 2),
  placeholder: "Enter group IDs",
  clean: cleanObject,
});

export const realmId = input({
  label: "Realm ID",
  type: "string",
  required: false,
  comments: "The ID of the realm to which the user belongs.",
  example: "00g1abcd2EFGHijkL3m4",
  placeholder: "Enter realm ID",
  dataSource: "selectRealm",
  clean: cleanString,
});

export const type = input({
  label: "Type",
  type: "string",
  required: false,
  comments: "The type of the user.",
  example: "Employee",
  placeholder: "Enter user type",
  dataSource: "selectUserType",
  clean: cleanString,
});

export const providerName = input({
  label: "Provider Name",
  type: "string",
  required: false,
  comments: "The name of the provider for the user.",
  example: "OKTA",
  placeholder: "Enter provider name",
  clean: cleanString,
});

export const providerType = input({
  label: "Provider Type",
  type: "string",
  required: false,
  comments: "The type of the provider for the user.",
  placeholder: "Enter provider type",
  model: [
    { label: "ACTIVE_DIRECTORY", value: "ACTIVE_DIRECTORY" },
    { label: "FEDERATION", value: "FEDERATION" },
    { label: "IMPORT", value: "IMPORT" },
    { label: "LDAP", value: "LDAP" },
    { label: "OKTA", value: "OKTA" },
    { label: "SOCIAL", value: "SOCIAL" },
  ],
  clean: cleanString,
});

export const revokeSessions = input({
  label: "Revoke Sessions",
  type: "boolean",
  required: false,
  comments: "When true, revokes all of the user's active sessions.",
  clean: util.types.toBool,
});

export const oauthTokens = input({
  label: "OAuth Tokens",
  type: "boolean",
  required: false,
  comments: "Revokes issued OpenID Connect and OAuth refresh and access tokens.",
  clean: util.types.toBool,
});

export const forgetDevices = input({
  label: "Forget Devices",
  type: "boolean",
  required: false,
  comments: "Clears the user's remembered factors for all devices.",
  clean: util.types.toBool,
});

export const factorId = input({
  label: "Factor ID",
  type: "string",
  required: true,
  comments: "ID of an existing user factor.",
  example: "opf1abcd2EFGHijkL3m4",
  placeholder: "Enter Factor ID",
  dataSource: "selectUserFactor",
  clean: util.types.toString,
});

export const removeRecoveryEnrollment = input({
  label: "Remove Recovery Enrollment",
  type: "boolean",
  required: false,
  comments:
    "When true, removes the phone number as both a recovery method and a factor. This parameter is only used for the sms and call factors.",
  clean: util.types.toBool,
});

export const provider = input({
  label: "Provider",
  type: "boolean",
  required: false,
  comments: "Indicates whether to create a user with a specified authentication provider.",
  clean: util.types.toBool,
});

export const nextLogin = input({
  label: "Next Login",
  type: "string",
  required: false,
  comments:
    "With activate=true, if nextLogin=changePassword, a user is created, activated, and the password is set to EXPIRED. The user must change it the next time they sign in.",
  example: "changePassword",
  placeholder: "Enter next login action",
  clean: cleanString,
});

export const activate = input({
  label: "Activate",
  type: "boolean",
  required: false,
  comments: "When true, executes an activation lifecycle operation when creating the user.",
  clean: util.types.toBool,
  default: "true",
});

export const listUsersInputs = {
  ...listInputs,
};

export const listUserTypesInputs = {
  connection,
};

export const listUserGroupsInputs = {
  id: {
    ...id,
    dataSource: "selectUser",
  },
  connection,
};

export const getUserInputs = {
  id: {
    ...id,
    dataSource: "selectUser",
  },
  expand,
  connection,
};

export const listUserFactorsInputs = {
  userId,
  connection,
};

export const unenrollUserFactorInputs = {
  userId,
  factorId,
  removeRecoveryEnrollment,
  connection,
};

export const clearUserSessionsInputs = {
  userId: {
    ...userId,
    comments: "ID of an existing Okta user.",
    example: "00ub0oNGTSWTBKOLGLNR",
  },
  oauthTokens,
  forgetDevices,
  connection,
};

export const deactivateUserInputs = {
  id: {
    ...id,
    dataSource: "selectUser",
  },
  sendEmail,
  connection,
};

export const suspendUserInputs = {
  id: {
    ...id,
    dataSource: "selectUser",
  },
  connection,
};

export const updateUserInputs = {
  id: {
    ...id,
    dataSource: "selectUser",
  },
  login: {
    ...login,
    required: false,
    clean: cleanString,
  },
  email: {
    ...email,
    required: false,
    clean: cleanString,
  },
  department: {
    ...department,
    required: false,
    clean: cleanString,
  },
  employeeNumber: {
    ...employeeNumber,
    required: false,
    clean: cleanString,
  },
  locale: {
    ...locale,
    required: false,
    clean: cleanString,
  },
  firstName,
  lastName,
  mobilePhone,
  password,
  hashPassword,
  question,
  answer,
  realmId,
  profileExtraInputs: {
    ...extraBody,
    label: "Profile Extra Attributes",
    comments:
      "List of additional profile attributes to include in the request. This can be used to include attributes that are not explicitly supported by this component. See [Okta's API documentation](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/#tag/User/operation/updateUser!path=profile&t=request) for a list of supported attributes.",
  },
  connection,
};

export const createUserInputs = {
  login,
  email,
  department,
  employeeNumber,
  locale,
  firstName: {
    ...firstName,
    required: true,
  },
  lastName: {
    ...lastName,
    required: true,
  },
  mobilePhone,
  password,
  hashPassword,
  question,
  answer,
  providerName,
  providerType,
  groupIds,
  realmId,
  type,
  nextLogin,
  provider,
  activate,
  profileExtraInputs: {
    ...extraBody,
    label: "Profile Extra Attributes",
    comments:
      "List of additional profile attributes to include in the request. This can be used to include attributes that are not explicitly supported by this component. See [Okta's API documentation](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/#tag/User/operation/updateUser!path=profile&t=request) for a list of supported attributes.",
  },
  connection,
};

export const resetUserPasswordInputs = {
  id: {
    ...id,
    dataSource: "selectUser",
  },
  sendEmail: {
    ...sendEmail,
    required: true,
    default: "true",
  },
  revokeSessions,
  connection,
};

export const setUserPasswordInputs = {
  userId,
  newPassword: {
    ...password,
    label: "New Password",
    required: true,
    comments: "The new password for the user.",
    placeholder: "Enter new password",
  },
  newHashPassword: {
    ...hashPassword,
    required: false,
    label: "New Hash Password",
    comments: "The new password hash for the user.",
    placeholder: "Enter the new hash password",
  },
  oldPassword: {
    ...password,
    label: "Old Password",
    required: true,
    comments: "The old password for the user.",
    placeholder: "Enter old password",
  },
  oldHashPassword: {
    ...hashPassword,
    required: false,
    label: "Old Hash Password",
    comments: "The old password hash for the user.",
    placeholder: "Enter the old hash password",
  },
  revokeSessions,
  connection,
};
