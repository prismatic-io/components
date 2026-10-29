export interface Task {
  id: string;
  title: string;
}

export interface TaskListResponse {
  tasks: Task[];
}
