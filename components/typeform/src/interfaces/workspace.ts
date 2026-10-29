export interface Workspace {
  account_id: string;
  id: string;
  name: string;
  shared: boolean;
  forms: WorkspaceForm[];
  self: WorkspaceSelf[];
}

export interface WorkspaceForm {
  count: number;
  href: string;
}

export interface WorkspaceSelf {
  href: string;
}
