import { input, util } from "@prismatic-io/spectral";
import { connectionInput, pagination, userId, workspaceId } from "./common";
const workspaceName = input({
  label: "Workspace Name",
  type: "string",
  example: "My Workspace",
  placeholder: "Enter workspace name",
  comments: "The display name of the workspace to search for.",
  required: true,
  clean: util.types.toString,
});
export const getWorkspaceInputs = {
  asanaConnection: connectionInput,
  workspaceId,
};
export const listWorkspacesInputs = {
  asanaConnection: connectionInput,
  pagination,
};
export const findWorkspaceByNameInputs = {
  asanaConnection: connectionInput,
  workspaceName,
};
export const addUserInputs = {
  asanaConnection: connectionInput,
  userId,
  workspaceId,
};
