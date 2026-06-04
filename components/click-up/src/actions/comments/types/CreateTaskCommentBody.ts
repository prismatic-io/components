export interface CreateTaskCommentBody {
  comment_text: string;
  assignee: number | undefined;
  notify_all: boolean;
}
