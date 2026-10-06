import type { CustomTaskIdsQueryParams } from "./common";
export interface CreateTaskCommentBody {
  comment_text: string;
  notify_all: boolean;
  assignee?: number;
}
export type CreateTaskCommentQueryParams = CustomTaskIdsQueryParams;
export interface GetTaskCommentsQueryParams extends CustomTaskIdsQueryParams {
  start?: string;
  start_id?: string;
}
export interface UpdateCommentBody {
  comment_text: string;
  resolved: boolean;
  assignee?: number;
}
