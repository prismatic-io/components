import accountWorkspaces from "./account";
import { createWorkspace } from "./create";
import { deleteWorkspace } from "./delets";
import { getWorkspace } from "./get";
import { listWorkspaces } from "./list";
import { updateWorkspace } from "./update";

export default {
  createWorkspace,
  updateWorkspace,
  getWorkspace,
  deleteWorkspace,
  listWorkspaces,
  ...accountWorkspaces,
};
