import { input, util } from "@prismatic-io/spectral";
import { toOptionalString, validateId } from "../util";
import { connectionInput, teamId, userId, workspaceId } from "./common";
const teamName = input({
  label: "Team Name",
  type: "string",
  example: "Engineering Team",
  placeholder: "Enter team name",
  comments: "The display name for the team.",
  required: true,
  clean: util.types.toString,
});
const teamDescription = input({
  label: "Team Description",
  type: "string",
  example: "This is an example description",
  placeholder: "Enter team description",
  comments:
    "Free-form description of the team's purpose, shown on the team page in Asana.",
  required: false,
  clean: toOptionalString,
});
const organizationId = input({
  label: "Organization or Workspace ID",
  type: "string",
  example: "375893453",
  placeholder: "Enter organization or workspace ID",
  comments: "The unique identifier for the organization or workspace.",
  required: true,
  clean: validateId,
});
const findTeamNameInput = input({
  label: "Team Name",
  type: "string",
  example: "Engineering",
  placeholder: "Enter team name",
  required: true,
  comments:
    "Note: if multiple teams share a name, only one team will be returned.",
  clean: util.types.toString,
});
export const createTeamInputs = {
  asanaConnection: connectionInput,
  organizationId,
  teamDescription,
  teamName,
};
export const getTeamInputs = {
  asanaConnection: connectionInput,
  teamId,
};
export const listTeamsInputs = {
  asanaConnection: connectionInput,
  workspaceId,
};
export const addUserToTeamInputs = {
  asanaConnection: connectionInput,
  teamId,
  userId,
};
export const findTeamByNameInputs = {
  asanaConnection: connectionInput,
  teamName: findTeamNameInput,
  workspaceId,
};
