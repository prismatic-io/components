import { input, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  dynamicValues,
  expand,
  fieldValues,
  pagination,
  projectKey,
  searchString,
  searchValue,
} from "./common";

const accountId = input({
  label: "Account ID",
  type: "string",
  placeholder: "Enter account ID",
  required: true,
  example: "5b10a2844c20165700ede21g",
  comments: "The unique Atlassian account ID of the user.",
  clean: util.types.toString,
});

const emailAddress = input({
  label: "Email Address",
  type: "string",
  placeholder: "Enter email address",
  required: false,
  example: "someone@example.com",
  comments: "The email address of the user.",
  clean: util.types.toString,
});

const username = input({
  label: "Username",
  type: "string",
  placeholder: "Enter username",
  required: true,
  example: "john.doe",
  comments: "The username for the Jira user account.",
  clean: util.types.toString,
});

const password = input({
  label: "Password",
  type: "password",
  placeholder: "Enter password",
  required: true,
  comments: "The password to assign to the new user account.",
  clean: util.types.toString,
});

const notifications = input({
  label: "Notifications",
  type: "boolean",
  required: true,
  comments:
    "When true, the user will receive email notifications for relevant events.",
  clean: util.types.toBool,
});

const displayName = input({
  label: "Display Name",
  type: "string",
  placeholder: "Enter display name",
  required: false,
  example: "John Doe",
  comments:
    "The full name shown for the user across Jira, such as in assignee and reporter fields.",
  clean: util.types.toString,
});

export const createUserInputs = {
  jiraConnection: connectionInput,
  emailAddress: { ...emailAddress, required: true },
  username,
  password,
  notifications,
  displayName,
  dynamicValues,
  fieldValues,
};

export const findUserInputs = {
  jiraConnection: connectionInput,
  searchValue,
};

export const getCurrentUserInputs = {
  jiraConnection: connectionInput,
};

export const getUserInputs = {
  jiraConnection: connectionInput,
  accountId,
  expand,
};

export const listAssignableUsersInputs = {
  jiraConnection: connectionInput,
  projectKey: { ...projectKey, required: true },
  pagination,
};

export const searchUsersInputs = {
  jiraConnection: connectionInput,
  searchString,
};
