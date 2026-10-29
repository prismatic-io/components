import { connectionInput, teamIdInput } from "./common";

export const listTeamsInputs = {
  ssvConnection: connectionInput,
};

export const getTeamSystemTypesInputs = {
  ssvConnection: connectionInput,
  teamId: teamIdInput,
};

export const getTeamMembersInputs = {
  ssvConnection: connectionInput,
  teamId: teamIdInput,
};
