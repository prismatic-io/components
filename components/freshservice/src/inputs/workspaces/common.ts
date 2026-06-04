import { input, util } from "@prismatic-io/spectral";

export const workspaceId = input({
  label: "Workspace ID",
  type: "string",
  required: false,
  comments: "The unique identifier for the workspace.",
  example: "3",
  placeholder: "Enter workspace ID",
  dataSource: "selectWorkspace",
  clean: util.types.toNumber,
});
