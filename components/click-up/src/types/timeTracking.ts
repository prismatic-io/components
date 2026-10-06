export type TagAction = "replace" | "add" | "remove";
import type { CustomTaskIdsQueryParams } from "./common";
import type { Tag } from "./tags";
export interface CreateTimeEntryBody {
  description: string;
  tags: Tag[];
  billable: boolean;
  tid: string;
  start?: number;
  duration?: number;
  assignee?: number;
}
export interface CreateTimeEntryQueryParams extends CustomTaskIdsQueryParams {
  custom_task_ids: boolean;
}
export interface SingularTimeEntryQueryParams {
  include_task_tags?: string;
  include_location_names?: string;
}
export interface StartTimeEntryBody {
  description: string;
  tags: Tag[];
  tid: string;
  billable: boolean;
}
export interface TimeEntriesDateRangeQueryParams {
  start_date?: string;
  end_date?: string;
  assignee?: string;
  include_task_tags?: string;
  include_location_names?: string;
  space_id?: string;
  folder_id?: string;
  list_id?: string;
  task_id?: string;
  custom_task_ids?: string;
  team_id?: string;
}
export interface UpdateTimeEntryBody {
  description: string;
  tags: Tag[];
  tag_action: TagAction;
  tid: string;
  billable: boolean;
  start?: number;
  end?: number;
  duration?: number;
}
