import type { Workspace } from "./Workspace";
export interface User {
  gid: string;
  name: string;
  email: string;
  resource_type: string;
  workspaces: Workspace[];
}
