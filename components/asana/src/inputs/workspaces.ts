import { input } from "@prismatic-io/spectral";
import { connectionInput, pagination, userId, workspaceId } from "./common";
const workspaceName = input({
  label: "Workspace Name",
  type: "string",
  required: true,
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
export const selectWorkspaceInputs = {
  connection: connectionInput,
};
