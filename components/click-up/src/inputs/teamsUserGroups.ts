import { input, util } from "@prismatic-io/spectral";
import {
  cleanCommaSeparatedString,
  cleanNumberArray,
  cleanString,
} from "../util";
import { connectionInput, getTeamId } from "./common";
const groupIds = input({
  label: "Group IDs",
  type: "string",
  placeholder: "Enter Group IDs",
  example: "C9C58BE9-7C73-4002-A6A9-310014852858",
  comments:
    "Enter one or more Team IDs (user groups) to retrieve information about specific Teams.",
  required: false,
  clean: cleanString,
});
const groupId = input({
  label: "Group ID",
  type: "string",
  placeholder: "Enter Group ID",
  example: "7C73-4002-A6A9-310014852858",
  comments: "Team ID (user group).",
  required: true,
  clean: util.types.toString,
});
const teamName = input({
  label: "Team Name",
  type: "string",
  placeholder: "Enter team name",
  example: "Engineering Team",
  comments: "Desired Team Name.",
  required: false,
  clean: cleanString,
});
const teamHandle = input({
  label: "Team Handle",
  type: "string",
  placeholder: "Enter team handle",
  example: "engineering",
  comments:
    "The handle used to @mention the Team (user group) in the Workspace.",
  required: false,
  clean: cleanString,
});
const addMember = input({
  label: "Add Member",
  type: "string",
  placeholder: "Enter member IDs",
  example: "12345,5678",
  comments: "Add members by ID. Comma separate each user ID.",
  required: false,
  clean: cleanCommaSeparatedString,
});
const removeMember = input({
  label: "Remove Member",
  type: "string",
  placeholder: "Enter member IDs",
  example: "12345,5678",
  comments: "Remove members by ID. Comma separate each user ID.",
  required: false,
  clean: cleanCommaSeparatedString,
});
const name = input({
  label: "Name",
  type: "string",
  placeholder: "Enter name",
  example: "Engineering Team",
  comments: "Desired Team Name.",
  required: true,
  clean: util.types.toString,
});
const members = input({
  label: "Member",
  type: "string",
  collection: "valuelist",
  placeholder: "Enter user ID",
  comments: "Add user by ID.",
  example: '["12345678", "87654321"]',
  required: true,
  clean: cleanNumberArray,
});
export const createTeamInputs = {
  clickUpConnection: connectionInput,
  teamId: getTeamId(true),
  name,
  members,
};
export const deleteTeamInputs = {
  clickUpConnection: connectionInput,
  groupId,
};
export const getTeamInputs = {
  clickUpConnection: connectionInput,
  teamId: getTeamId(false),
  groupIds,
};
export const updateTeamInputs = {
  clickUpConnection: connectionInput,
  groupId,
  teamName,
  teamHandle,
  addMember,
  removeMember,
};
