import { connectionInput, getTeamId } from "./common";
export const getAuthorizedTeamsInputs = {
  clickUpConnection: connectionInput,
};
export const getWorkspacePlanInputs = {
  clickUpConnection: connectionInput,
  teamId: getTeamId(true),
};
export const getWorkspaceSeatsInputs = {
  clickUpConnection: connectionInput,
  teamId: getTeamId(true),
};
