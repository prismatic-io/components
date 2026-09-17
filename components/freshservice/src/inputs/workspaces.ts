import { input, util } from "@prismatic-io/spectral";
import {
  additionalQueryParams,
  connection,
  fetchAll,
  pagination,
} from "./common";
const workspaceId = input({
  label: "Workspace ID",
  type: "string",
  required: false,
  comments: "The unique identifier for the workspace.",
  example: "3",
  placeholder: "Enter workspace ID",
  dataSource: "selectWorkspace",
  clean: util.types.toNumber,
});
export const getWorkspaceInputs = {
  connection,
  workspaceId: input({
    ...workspaceId,
    comments: "ID of the workspace to retrieve.",
    required: true,
    clean: util.types.toNumber,
  }),
  additionalQueryParams,
};
export const listWorkspacesInputs = {
  connection,
  fetchAll,
  pagination,
  additionalQueryParams,
};
