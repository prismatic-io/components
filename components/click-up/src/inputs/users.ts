import { input, util } from "@prismatic-io/spectral";
import { cleanString } from "../util";
import { connectionInput, customRoleId, getEmail, getTeamId } from "./common";
const userId = input({
  label: "User ID",
  type: "string",
  placeholder: "Enter User ID",
  example: "38312345",
  comments: "The unique identifier for the user.",
  required: true,
  clean: util.types.toString,
});
const admin = input({
  label: "Admin",
  type: "boolean",
  comments: "When true, grants admin privileges to the user.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});
const username = input({
  label: "Username",
  type: "string",
  placeholder: "Enter username",
  example: "Jane Smith",
  comments:
    "The new display name for the user. Leave empty to keep the current username.",
  required: false,
  clean: cleanString,
});
export const editUserOnWorkspaceInputs = {
  teamId: getTeamId(true),
  clickUpConnection: connectionInput,
  admin,
  customRoleId,
  userId,
  username,
};
export const getUserInputs = {
  teamId: getTeamId(true),
  userId,
  clickUpConnection: connectionInput,
};
export const inviteUserToWorkspaceInputs = {
  teamId: getTeamId(true),
  clickUpConnection: connectionInput,
  email: getEmail(true, "Email address of User being added"),
  admin,
  customRoleId,
};
export const removeUserFromWorkspaceInputs = {
  teamId: getTeamId(true),
  clickUpConnection: connectionInput,
  userId,
};
