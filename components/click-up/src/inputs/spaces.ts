import { input, util } from "@prismatic-io/spectral";
import { connectionInput, getSpaceId, getTeamId } from "./common";
const spaceName = input({
  label: "Space Name",
  type: "string",
  placeholder: "Enter space name",
  example: "Engineering Space",
  comments: "The display name of the Space.",
  required: true,
  clean: util.types.toString,
});
const color = input({
  label: "Color",
  type: "string",
  placeholder: "Enter hex color code",
  example: "#7B68EE",
  comments: "Hex color code.",
  required: true,
  clean: util.types.toString,
});
const privateInput = input({
  label: "Private",
  type: "boolean",
  comments: "When true, the Space is private.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});
const adminCanManage = input({
  label: "Admin Can Manage",
  type: "boolean",
  comments: "When true, admins can manage the Space.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});
const multipleAssignees = input({
  label: "Multiple Assignees",
  type: "boolean",
  comments: "When true, the Space allows multiple assignees on tasks.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});
const enableDueDates = input({
  label: "Enable Due Dates",
  type: "boolean",
  comments: "When true, enables due dates for tasks in the Space.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});
const useStartDate = input({
  label: "Use Start Date",
  type: "boolean",
  comments: "When true, enables start dates for tasks in the Space.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});
const remapDueDates = input({
  label: "Remap Due Dates",
  type: "boolean",
  comments: "When true, remaps due dates when tasks are moved.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});
const remapClosedDueDates = input({
  label: "Remap Closed Due Dates",
  type: "boolean",
  comments: "When true, remaps due dates for closed tasks when moved.",
  required: true,
  default: "false",
  clean: util.types.toBool,
});
const enableTimeTracking = input({
  label: "Enable Time Tracking",
  type: "boolean",
  comments: "When true, enables time tracking for tasks in the Space.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});
const enableTags = input({
  label: "Enable Tags",
  type: "boolean",
  comments: "When true, enables tags for tasks in the Space.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});
const enableTimeEstimates = input({
  label: "Enable Time Estimates",
  type: "boolean",
  comments: "When true, enables time estimates for tasks in the Space.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});
const enableChecklists = input({
  label: "Enable Checklists",
  type: "boolean",
  comments: "When true, enables checklists for tasks in the Space.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});
const enableCustomFields = input({
  label: "Enable Custom Fields",
  type: "boolean",
  comments: "When true, enables custom fields for tasks in the Space.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});
const enableRemapDependencies = input({
  label: "Enable Remap Dependencies",
  type: "boolean",
  comments: "When true, enables remapping of task dependencies when moved.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});
const enableDependencyWarning = input({
  label: "Enable Dependency Warning",
  type: "boolean",
  comments: "When true, enables warnings for task dependency conflicts.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});
const enablePortfolios = input({
  label: "Enable Portfolios",
  type: "boolean",
  comments: "When true, enables portfolios for the Space.",
  required: true,
  default: "true",
  clean: util.types.toBool,
});
export const createSpaceInputs = {
  clickUpConnection: connectionInput,
  teamId: getTeamId(true),
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
  spaceId: getSpaceId(true),
};
export const getSpaceInputs = {
  clickUpConnection: connectionInput,
  spaceId: getSpaceId(true),
};
export const listSpacesInputs = {
  clickUpConnection: connectionInput,
  teamId: getTeamId(true),
};
export const updateSpaceInputs = {
  clickUpConnection: connectionInput,
  spaceId: getSpaceId(true),
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
