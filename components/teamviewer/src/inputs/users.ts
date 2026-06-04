import { defaultInputs } from "./general";
import { input, util } from "@prismatic-io/spectral";
import { cleanCodeToArray, cleanString } from "../util";

export const deleteCompanyUserInputs = {
  ...defaultInputs,
};

export const userId = input({
  label: "User ID",
  comments: "The ID of the user to retrieve.",
  type: "string",
  required: true,
  placeholder: "<your-user-id>",
  example: "<your-user-id>",
  dataSource: "selectUser",
  clean: util.types.toString,
});

export const isPermanentDelete = input({
  label: "Permanent Delete",
  comments: "Whether to permanently delete the user or just deactivate them.",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

export const getUserInputs = {
  userId,
  ...defaultInputs,
};

export const deleteUserInputs = {
  userId,
  isPermanentDelete,
  ...defaultInputs,
};

export const userEmail = input({
  label: "User Email",
  comments: "User email to query from.",
  type: "string",
  required: true,
  placeholder: "example@company.io",
  example: "example@company.io",
  clean: cleanString,
});

export const userName = input({
  label: "User Name",
  comments: "User name to query from.",
  type: "string",
  required: true,
  placeholder: "example_user",
  example: "example_user",
  clean: cleanString,
});

export const fullList = input({
  label: "Full List",
  comments: "Is detailed user information needed",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

export const permissions = input({
  label: "User Permissions",
  comments:
    "Comma separated access rights. Please use user role APIs for user's rights.",
  type: "string",
  required: false,
  placeholder: "ADMIN, USER",
  example: "ADMIN, USER",
  clean: cleanString,
});

export const listUsersInputs = {
  userEmail: {
    ...userEmail,
    required: false,
    clean: cleanString,
  },
  userName: {
    ...userName,
    required: false,
    clean: cleanString,
  },
  fullList,
  permissions,
  ...defaultInputs,
};

export const password = input({
  label: "User Password",
  comments: "User password.",
  type: "string",
  required: false,
  clean: cleanString,
});

export const userRoleId = input({
  label: "User Role ID",
  comments: "The ID of the user role to assign to the user.",
  type: "string",
  required: false,
  placeholder: "<your-user-role-id>",
  example: "<your-user-role-id>",
  dataSource: "selectUserRole",
  clean: cleanString,
});

export const language = input({
  label: "User Language",
  comments: "User language.",
  type: "string",
  required: true,
  placeholder: "en",
  example: "en",
  clean: util.types.toString,
});

export const subscribeNewsletter = input({
  label: "Subscribe Newsletter",
  comments: "Should subscribe to the newsletter.",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

export const logSessions = input({
  label: "Log Sessions",
  comments: "Should log user sessions.",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

export const showCommentWindow = input({
  label: "Show Comment Window",
  comments: "Should show comment window.",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

export const customQuickSupportId = input({
  label: "Custom Quick Support ID",
  comments: "Custom Quick Support ID of the user",
  type: "string",
  required: false,
  example: "<your_custom_quick_support_id>",
  placeholder: "<your_custom_quick_support_id>",
  clean: cleanString,
});

export const customQuickJoinId = input({
  label: "Custom Quick Join ID",
  comments: "Custom Quick Join ID of the user",
  type: "string",
  required: false,
  example: "<your_custom_quick_join_id>",
  placeholder: "<your_custom_quick_join_id>",
  clean: cleanString,
});

export const licenseKey = input({
  label: "License Key",
  comments: "License key of the user",
  type: "string",
  required: false,
  example: "<your_license_key>",
  placeholder: "<your_license_key>",
  clean: cleanString,
});

export const meetingLicenseKey = input({
  label: "Meeting License Key",
  comments: "Meeting License key of the user",
  type: "string",
  required: false,
  example: "<your_meeting_license_key>",
  placeholder: "<your_meeting_license_key>",
  clean: cleanString,
});

export const ssoCustomerId = input({
  label: "SSO Customer ID",
  comments: "SSO Customer ID of the user",
  type: "string",
  required: false,
  example: "<your_sso_customer_id>",
  placeholder: "<your_sso_customer_id>",
  clean: cleanString,
});

export const ignorePredefinedRole = input({
  label: "Ignored Predefined Roles",
  comments: "Ignored Predefined Roles",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

export const createUserInputs = {
  email: {
    ...userEmail,
    required: true,
    clean: util.types.toString,
  },
  name: {
    ...userName,
    required: true,
    clean: util.types.toString,
  },
  password,
  userRoleId,
  language,
  subscribeNewsletter,
  logSessions,
  showCommentWindow,
  customQuickSupportId,
  customQuickJoinId,
  licenseKey,
  meetingLicenseKey,
  ssoCustomerId,
  ignorePredefinedRole,
  ...defaultInputs,
};

export const isUserActive = input({
  label: "Is User Active",
  comments: "Deactivates or Activates the user account.",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

export const isTFAEnforced = input({
  label: "Is TFA Enforced",
  comments: "Enforces Two Factor Authentication for the user.",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

export const assignUserRoleIds = input({
  label: "Assign User Role IDs",
  comments: "Comma separated list of user role IDs to assign to the user.",
  type: "code",
  language: "json",
  example: JSON.stringify([
    "<your-user-role-id>",
    "<your-user-role-id>",
    "<your-user-role-id>",
  ]),
  required: false,
  clean: cleanCodeToArray,
});

export const unassignUserRoleIds = input({
  label: "Unassign User Role IDs",
  comments: "Comma separated list of user role IDs to unassign to the user.",
  type: "code",
  language: "json",
  example: JSON.stringify([
    "<your-user-role-id>",
    "<your-user-role-id>",
    "<your-user-role-id>",
  ]),
  required: false,
  clean: cleanCodeToArray,
});

export const updateUserInputs = {
  userId,
  email: {
    ...userEmail,
    required: false,
    clean: cleanString,
  },
  name: {
    ...userName,
    required: false,
    clean: cleanString,
  },
  AssignUserRoleIds: assignUserRoleIds,
  UnassignUserRoleIds: unassignUserRoleIds,
  password,
  active: isUserActive,
  log_sessions: logSessions,
  show_comment_window: showCommentWindow,
  custom_quicksupport_id: customQuickSupportId,
  custom_quickjoin_id: customQuickJoinId,
  license_key: licenseKey,
  sso_customer_id: ssoCustomerId,
  tfa_enforced: isTFAEnforced,
  ...defaultInputs,
};
