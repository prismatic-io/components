import { toOptionalString } from "../util";
import {
  assigneeId,
  connectionInput,
  projectId,
  taskId,
  teamId,
  workspaceId,
} from "./common";
export const selectAttachmentInputs = {
  connection: connectionInput,
  taskId: { ...taskId, dataSource: undefined },
};
export const selectCustomFieldInputs = {
  connection: connectionInput,
  workspaceId: { ...workspaceId, dataSource: undefined },
};
export const selectPortfolioInputs = {
  connection: connectionInput,
  workspaceId: {
    ...workspaceId,
    required: false,
    dataSource: undefined,
    clean: toOptionalString,
  },
};
export const selectProjectInputs = {
  connection: connectionInput,
  workspace: {
    ...workspaceId,
    required: false,
    clean: toOptionalString,
    dataSource: undefined,
  },
  team: {
    ...teamId,
    required: false,
    clean: toOptionalString,
    dataSource: undefined,
  },
};
export const selectSectionInputs = {
  connection: connectionInput,
  projectId: { ...projectId, dataSource: undefined },
};
export const selectTagInputs = {
  connection: connectionInput,
  workspaceId: { ...workspaceId, dataSource: undefined },
};
export const selectTaskInputs = {
  connection: connectionInput,
  project: {
    ...projectId,
    required: false,
    clean: toOptionalString,
    dataSource: undefined,
  },
  workspace: {
    ...workspaceId,
    required: false,
    clean: toOptionalString,
    dataSource: undefined,
    comments: `${workspaceId.comments} Workspace ID must be provided with an Assignee ID.`,
  },
  assignee: {
    ...assigneeId,
    comments: `${assigneeId.comments} Assignee ID must be provided with a Workspace ID.`,
  },
};
export const selectTeamInputs = {
  connection: connectionInput,
  workspaceId: { ...workspaceId, dataSource: undefined },
};
export const selectUserInputs = {
  connection: connectionInput,
  workspaceId: {
    ...workspaceId,
    required: false,
    dataSource: undefined,
    clean: toOptionalString,
  },
};
export const selectWorkspaceInputs = {
  connection: connectionInput,
};
