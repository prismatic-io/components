import {
  additionalProperties,
  connection,
  eventualConsistencyLevelHeader,
  getAllPaginatedResults,
  odataParams,
  userId,
} from "./common";

export const listUsersInputs = {
  connection,
  $count: odataParams.$count,
  $expand: odataParams.$expand,
  $filter: odataParams.$filter,
  $orderby: odataParams.$orderby,
  $search: odataParams.$search,
  $select: odataParams.$select,
  $top: odataParams.$top,
  getAllPaginatedResults,
  eventualConsistencyLevelHeader,
};

import { input, util } from "@prismatic-io/spectral";
import {
  cleanBooleanInput,
  getOptionalBooleanModel,
  toOptionalString,
} from "../util";

const accountEnabled = input({
  label: "Account Enabled",
  type: "boolean",
  required: true,
  default: "true",
  comments: "When true, the account is enabled.",
  clean: util.types.toBool,
});

const displayName = input({
  label: "Display Name",
  type: "string",
  required: true,
  comments: "The display name of the user.",
  placeholder: "Enter display name",
  example: "Adele Vance",
  clean: util.types.toString,
});

const forceChangePasswordNextSignIn = input({
  label: "Force Change Password Next Sign In",
  type: "boolean",
  required: true,
  default: "true",
  comments:
    "When true, the user is required to change their password on the next sign-in.",
  clean: util.types.toBool,
});

const password = input({
  label: "Password",
  type: "password",
  required: true,
  comments:
    "The initial password for the user account. Must meet the tenant's password complexity requirements.",
  example: "Jaka889740",
  placeholder: "Enter password",
  clean: util.types.toString,
});

const userPrincipalName = input({
  label: "User Principal Name",
  type: "string",
  required: true,
  comments:
    "The user principal name (UPN) for the account, in the format alias@domain. The domain must be a verified domain in the tenant.",
  example: "AdeleV@contoso.com",
  placeholder: "Enter user principal name (e.g., user@domain.com)",
  clean: util.types.toString,
});

const domain = input({
  label: "Domain",
  type: "string",
  required: true,
  comments:
    "The domain for the user, this must be an existing domain in the tenant.",
  example: "domain.onmicrosoft.com",
  placeholder: "Enter domain",
  clean: util.types.toString,
});

export const createUserInputs = {
  connection,
  accountEnabled,
  displayName,
  forceChangePasswordNextSignIn,
  password,
  userPrincipalName,
  domain,
  additionalProperties: input({
    ...additionalProperties,
    comments: `${additionalProperties.comments} See [Create User API](https://learn.microsoft.com/en-us/graph/api/user-post-users).`,
  }),
};

export const deleteUserInputs = {
  connection,
  userId: input({
    ...userId,
    comments:
      "Unique Identifier for the user to delete. This can be the user's id or userPrincipalName.",
  }),
};

export const getUserInputs = {
  connection,
  userId: input({
    ...userId,
    comments:
      "Unique Identifier for the user to get. This can be the user's id or userPrincipalName.",
  }),
  $select: odataParams.$select,
};

const givenName = input({
  label: "First Name",
  type: "string",
  required: false,
  comments: "The updated first name of the user.",
  placeholder: "Enter first name",
  example: "John",
  clean: toOptionalString,
});

const surname = input({
  label: "Last Name",
  type: "string",
  required: false,
  comments: "The updated last name of the user.",
  placeholder: "Enter last name",
  example: "Doe",
  clean: toOptionalString,
});

const jobTitle = input({
  label: "Job Title",
  type: "string",
  required: false,
  comments: "The updated job title of the user.",
  placeholder: "Enter job title",
  example: "Software Engineer",
  clean: toOptionalString,
});

const accountEnabledOptional = input({
  label: accountEnabled.label,
  comments: accountEnabled.comments,
  type: "string",
  required: false,
  model: getOptionalBooleanModel(),
  clean: cleanBooleanInput,
});

export const updateUserInputs = {
  connection,
  userId: input({
    ...userId,
    comments:
      "Unique Identifier for the user to update. This can be the user's id or userPrincipalName.",
  }),
  accountEnabled: accountEnabledOptional,
  displayName: input({ ...displayName, required: false }),
  userPrincipalName: input({
    ...userPrincipalName,
    comments:
      "The updated user principal name of the user. Required if 'Domain' input is provided.",
    required: false,
  }),
  domain: input({
    ...domain,
    comments:
      "The updated domain for the user, this must be an existing domain in the tenant. Required if 'User Principal Name' input is provided.",
    required: false,
  }),
  givenName,
  surname,
  jobTitle,
  additionalProperties: input({
    ...additionalProperties,
    comments: `${additionalProperties.comments} See [Update User API](https://learn.microsoft.com/en-us/graph/api/user-update).`,
  }),
};
