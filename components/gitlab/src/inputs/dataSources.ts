import { connectionInput, project } from "./common";
const datasourceProject = { ...project, dataSource: undefined };
export const selectProjectInputs = { connection: connectionInput };
export const selectGroupInputs = { connection: connectionInput };
export const selectBranchInputs = {
  connection: connectionInput,
  project: datasourceProject,
};
export const selectLabelInputs = {
  connection: connectionInput,
  project: datasourceProject,
};
export const selectMilestoneInputs = {
  connection: connectionInput,
  project: datasourceProject,
};
export const selectUserInputs = {
  connection: connectionInput,
  project: datasourceProject,
};
