export interface CreateListBody {
  name: string;
  content?: string;
  due_date?: number;
  due_date_time?: boolean;
  priority?: number;
  assignee?: number;
  status?: string;
}
export interface UpdateListBody {
  name: string;
  content: string;
  due_date_time: boolean;
  assignee: string;
  status: string;
  unset_status: boolean;
  due_date?: number;
  priority?: number;
}
