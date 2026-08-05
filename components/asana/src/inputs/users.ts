import { input } from "@prismatic-io/spectral";
import { USER_OPT_FIELDS } from "../constants";
import { cleanString } from "../util";
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
  required: false,
  comments:
    "Note: if multiple users share a name, only one user will be returned.",
});
const userEmail = input({
  label: "User's Email",
  type: "string",
  example: "john.doe@example.com",
  required: false,
  comments:
    "Note: if multiple users share an email address, only one user will be returned.",
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
    comments: "Optionally filter by workspace ID",
  },
};
export const listUsersInTeamInputs = {
  asanaConnection: connectionInput,
  limit,
  offset,
  teamId,
  workspaceId: { ...workspaceId, required: false },
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
export const selectUserInputs = {
  connection: connectionInput,
  workspaceId: {
    ...workspaceId,
    required: false,
    dataSource: undefined,
    clean: cleanString,
  },
};
