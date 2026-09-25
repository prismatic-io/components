export interface Workspace {
  gid: string;
  name: string;
  resource_type: string;
}
export interface User {
  gid: string;
  name: string;
  email: string;
  resource_type: string;
  workspaces: Workspace[];
}
export interface Team {
  gid: string;
  name: string;
  resource_type: string;
}
export type Task = {
  gid: string;
  assignee: Record<string, unknown> | null;
  assignee_status: string;
  completed: boolean;
  completed_at: null | string;
  created_at: string;
  custom_fields: Record<string, unknown>[];
  dependencies: Record<string, unknown>[];
  dependents: Record<string, unknown>[];
  due_at: null | string;
  due_on: null | string;
  followers: Record<string, unknown>[];
  html_notes: string;
  is_rendered_as_separator: boolean;
  liked: boolean;
  likes: Record<string, unknown>[];
  memberships: Record<string, unknown>[];
  modified_at: string;
  name: string;
  notes: string;
  num_likes: number;
  num_subtasks: number;
  parent: Record<string, unknown> | null;
  projects: Record<string, unknown>[];
  resource_type: string;
  start_on: null | string;
  tags: Record<string, unknown>[];
  resource_subtype: string;
  workspace: Record<string, unknown>;
};
export interface Tag {
  gid: string;
  name: string;
  color: string;
  created_at: string;
  resource_type: string;
}
export interface DataSource {
  gid: string;
  name: string;
}
export interface PaginatedResponse<T> {
  data: {
    data: T[];
    next_page: {
      offset: string;
      path: string;
      uri: string;
    } | null;
  };
}
