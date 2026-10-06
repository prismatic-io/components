import type { CustomTaskIdsQueryParams } from "./common";
export interface Assignees {
  add?: number[];
  rem?: number[];
}
export interface CustomFieldValue {
  id: string;
  value: string;
}
export interface CreateTaskBody {
  name: string;
  description?: string;
  assignees?: number[];
  tags?: string[];
  status?: string;
  priority?: number;
  due_date?: number;
  due_date_time?: boolean;
  time_estimate?: number;
  start_date?: number;
  start_date_time?: boolean;
  notify_all?: boolean;
  parent?: string;
  links_to?: string;
  check_required_custom_fields?: boolean;
  custom_fields?: CustomFieldValue[];
  markdown_description?: string;
}
export type CreateTaskQueryParams = CustomTaskIdsQueryParams;
export type DeleteTaskQueryParams = CustomTaskIdsQueryParams;
export interface GetTaskQueryParams extends CustomTaskIdsQueryParams {
  include_subtasks?: boolean;
}
export interface ListTasksQueryParams {
  archived?: boolean;
  page?: number;
  order_by?: string;
  reverse?: boolean;
  subtasks?: boolean;
  statuses?: string;
  include_closed?: boolean;
  assignees?: string[];
  tags?: string[];
  due_date_gt?: string;
  due_date_lt?: string;
  date_created_gt?: string;
  date_created_lt?: string;
  date_updated_gt?: string;
  date_updated_lt?: string;
  date_done_gt?: string;
  date_done_lt?: string;
  custom_fields?: unknown[];
}
export interface UpdateTaskBody {
  due_date_time: boolean;
  start_date_time: boolean;
  assignees: Assignees;
  archived: boolean;
  name?: string;
  description?: string;
  status?: string;
  priority?: number;
  due_date?: number;
  parent?: string;
  time_estimate?: number;
  start_date?: number;
  markdown_description?: string;
}
export type UpdateTaskQueryParams = CustomTaskIdsQueryParams;
