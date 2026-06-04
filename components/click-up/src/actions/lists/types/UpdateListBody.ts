export interface UpdateListBody {
  name: string;
  content: string;
  due_date: number | undefined;
  due_date_time: boolean;
  priority: number | undefined;
  assignee: string;
  status: string;
  unset_status: boolean;
}
