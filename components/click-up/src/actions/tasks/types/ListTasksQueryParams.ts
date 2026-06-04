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
