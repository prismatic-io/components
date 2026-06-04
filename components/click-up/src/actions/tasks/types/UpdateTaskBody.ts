import type { Assignees } from "./Assignees";

export interface UpdateTaskBody {
  name: string;
  description: string;
  status: string;
  priority: number | undefined;
  due_date: number | undefined;
  due_date_time: boolean;
  parent: string;
  time_estimate: number | undefined;
  start_date: number | undefined;
  start_date_time: boolean;
  assignees: Assignees;
  archived: boolean;
  markdown_description?: string;
}
