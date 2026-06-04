import { input, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  includeAll,
  page,
  pageSize,
  workspaceId,
} from "./common";

const workspaceName = input({
  label: "Workspace Name",
  type: "string",
  example: "New Workspace",
  required: true,
  clean: util.types.toString,
  comments: "The display name for the workspace.",
  placeholder: "Enter workspace name",
});

const loadAll = input({
  label: "Load All",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
  comments:
    "Preserved for backward compatibility. Smartsheet's redesigned API no longer supports recursive nested expansion of folders/contents in a single response; this input has no effect on the migrated action.",
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
  loadAll,
};

export const listWorkspacesInputs = {
  connection: connectionInput,
  includeAll,
  page,
  pageSize,
};

export const updateWorkspaceInputs = {
  connection: connectionInput,
  workspaceId,
  name: updateWorkspaceName,
};
