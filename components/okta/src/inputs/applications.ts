import { input, util } from "@prismatic-io/spectral";
import { cleanObject, cleanString } from "../util/clean";
import { after, connection, expand, fetchAll, filter, limit, q } from "./general";
import { password, sendEmail, userId } from "./users";

export const applicationId = input({
  label: "Application ID",
  comments: "The unique identifier for the application.",
  example: "0oab1234XYZ5678",
  placeholder: "Enter Application ID",
  type: "string",
  required: true,
  dataSource: "selectApplication",
  clean: util.types.toString,
});

export const useOptimization = input({
  label: "Use Optimization",
  comments:
    "When true, the response will be optimized for faster retrieval. This may exclude some properties from the response.",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const includeNonDeleted = input({
  label: "Include Non-Deleted",
  comments: "When true, both deleted and non-deleted applications are returned.",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
});

export const scope = input({
  label: "Scope",
  type: "string",
  required: false,
  comments: "Specifies the scope of the application.",
  model: [
    { label: "USER", value: "USER" },
    { label: "GROUP", value: "GROUP" },
  ],
  clean: cleanString,
});

export const username = input({
  label: "Username",
  type: "string",
  required: false,
  comments: "The username of the user to whom the application will be assigned.",
  example: "johndoe",
  placeholder: "Enter username",
  clean: cleanString,
});

export const profile = input({
  label: "Profile",
  type: "code",
  language: "json",
  required: false,
  comments: "The app-specific profile for the user.",
  example: JSON.stringify(
    {
      salesforceGroups: ["Employee"],
      role: "Developer",
      profile: "Standard User",
    },
    null,
    2,
  ),
  clean: cleanObject,
});

export const listApplicationsInputs = {
  fetchAll,
  q,
  after,
  limit,
  useOptimization,
  filter,
  expand,
  includeNonDeleted,
  connection,
};

export const getApplicationInputs = {
  applicationId,
  expand,
  connection,
};

export const getApplicationUserAssignmentsInputs = {
  applicationId,
  userId,
  expand,
  connection,
};

export const deleteApplicationUserAssignmentsInputs = {
  applicationId,
  userId,
  sendEmail,
  connection,
};

export const updateApplicationUserAssignmentsInputs = {
  applicationId,
  userId,
  profile: {
    ...profile,
    comments:
      "The app-specific profile for the user. Either the profile or password/username must be provided.",
  },
  username,
  password: {
    ...password,
    comments: "The user's password.",
  },
  connection,
};

export const assignApplicationToUserInputs = {
  applicationId,
  userId,
  username,
  password: {
    ...password,
    comments: "The user's password.",
  },
  scope,
  profile,
  connection,
};
