import {
  addMember,
  connectionInput,
  getTeamId,
  groupId,
  groupIds,
  members,
  name,
  removeMember,
  teamHandle,
  teamName,
} from "./common";

const teamIdForCreate = getTeamId(true);
const teamIdForGet = getTeamId(false);

export const createTeamInputs = {
  clickUpConnection: connectionInput,
  teamId: teamIdForCreate,
  name,
  members,
};

export const deleteTeamInputs = {
  clickUpConnection: connectionInput,
  groupId,
};

export const getTeamInputs = {
  clickUpConnection: connectionInput,
  teamId: teamIdForGet,
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
