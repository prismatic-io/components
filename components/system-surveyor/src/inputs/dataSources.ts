import { connectionInput, siteId, teamIdInput } from "./common";

export const selectSiteInputs = {
  ssvConnection: connectionInput,
};

export const selectTeamInputs = {
  ssvConnection: connectionInput,
};

export const selectElementProfileInputs = {
  ssvConnection: connectionInput,
  teamId: { ...teamIdInput, dataSource: undefined },
};

export const selectSiteSurveyInputs = {
  ssvConnection: connectionInput,
  siteId: { ...siteId, dataSource: undefined },
};
