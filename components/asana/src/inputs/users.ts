import { input } from "@prismatic-io/spectral";
import { USER_OPT_FIELDS } from "../constants";
import { toOptionalId, toOptionalString } from "../util";
import {
  connectionInput,
  limit,
  offset,
  optFields,
  pagination,
  teamId,
  userId,
  workspaceId,
} from "./common";
const userName = input({
  label: "User's Full Name",
  type: "string",
  example: "John Doe",
  placeholder: "Enter user name",
  required: false,
  comments:
    "Note: if multiple users share a name, only one user will be returned.",
  clean: toOptionalString,
});
const userEmail = input({
  label: "User's Email",
  type: "string",
  example: "john.doe@example.com",
  placeholder: "Enter user email",
  required: false,
  comments:
    "Note: if multiple users share an email address, only one user will be returned.",
  clean: toOptionalString,
});
export const getUsersInputs = {
  asanaConnection: connectionInput,
  userId,
};
export const getCurrentUserInputs = {
  asanaConnection: connectionInput,
};
export const listUsersInputs = {
  asanaConnection: connectionInput,
  optFields: {
    ...optFields,
    default: USER_OPT_FIELDS,
  },
  pagination,
  workspaceId: {
    ...workspaceId,
    required: false,
    clean: toOptionalId,
    comments:
      "The unique identifier for the workspace. When provided, only users in this workspace are returned.",
  },
};
export const listUsersInTeamInputs = {
  asanaConnection: connectionInput,
  limit,
  offset,
  teamId,
  workspaceId: { ...workspaceId, required: false, clean: toOptionalId },
};
export const findUserByNameOrEmailInputs = {
  asanaConnection: connectionInput,
  userName,
  userEmail,
  workspaceId,
  optFields: {
    ...optFields,
    default: USER_OPT_FIELDS,
  },
};
