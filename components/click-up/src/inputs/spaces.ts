import {
  adminCanManage,
  color,
  connectionInput,
  enableChecklists,
  enableCustomFields,
  enableDependencyWarning,
  enableDueDates,
  enablePortfolios,
  enableRemapDependencies,
  enableTags,
  enableTimeEstimates,
  enableTimeTracking,
  getSpaceId,
  getTeamId,
  multipleAssignees,
  privateInput,
  remapClosedDueDates,
  remapDueDates,
  spaceName,
  useStartDate,
} from "./common";

const teamIdForCreate = getTeamId(true);
const spaceIdForDelete = getSpaceId(true);
const spaceIdForGet = getSpaceId(true);
const teamIdForList = getTeamId(true);
const spaceIdForUpdate = getSpaceId(true);

export const createSpaceInputs = {
  clickUpConnection: connectionInput,
  teamId: teamIdForCreate,
  spaceName,
  multipleAssignees,
  enableDueDates,
  useStartDate,
  remapDueDates,
  remapClosedDueDates,
  enableTimeTracking,
  enableTags,
  enableTimeEstimates,
  enableChecklists,
  enableCustomFields,
  enableRemapDependencies,
  enableDependencyWarning,
  enablePortfolios,
};

export const deleteSpaceInputs = {
  clickUpConnection: connectionInput,
  spaceId: spaceIdForDelete,
};

export const getSpaceInputs = {
  clickUpConnection: connectionInput,
  spaceId: spaceIdForGet,
};

export const listSpacesInputs = {
  clickUpConnection: connectionInput,
  teamId: teamIdForList,
};

export const updateSpaceInputs = {
  clickUpConnection: connectionInput,
  spaceId: spaceIdForUpdate,
  spaceName,
  multipleAssignees,
  enableDueDates,
  useStartDate,
  remapDueDates,
  remapClosedDueDates,
  enableTimeTracking,
  enableTags,
  enableTimeEstimates,
  enableChecklists,
  enableCustomFields,
  enableRemapDependencies,
  enableDependencyWarning,
  enablePortfolios,
  color,
  privateInput,
  adminCanManage,
};
