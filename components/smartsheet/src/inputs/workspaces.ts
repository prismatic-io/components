import { input, util } from "@prismatic-io/spectral";
import { connectionInput, workspaceId } from "./common";
const workspaceName = input({
  label: "Workspace Name",
  type: "string",
  example: "New Workspace",
  required: true,
  clean: util.types.toString,
  comments: "The display name for the workspace.",
  placeholder: "Enter workspace name",
});
const updateWorkspaceName = input({
  label: "Name",
  type: "string",
  required: true,
  clean: (value) => util.types.toString(value) || undefined,
  comments: "The updated display name for the workspace.",
  placeholder: "Enter new workspace name",
});
export const createWorkspaceInputs = {
  connection: connectionInput,
  name: workspaceName,
};
export const deleteWorkspaceInputs = {
  connection: connectionInput,
  workspaceId,
};
export const getWorkspaceInputs = {
  connection: connectionInput,
  workspaceId,
};
export const listWorkspacesInputs = {
  connection: connectionInput,
};
export const updateWorkspaceInputs = {
  connection: connectionInput,
  workspaceId,
  name: updateWorkspaceName,
};
