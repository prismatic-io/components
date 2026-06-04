export interface UpdateCommentBody {
  comment_text: string;
  assignee: number | undefined;
  resolved: boolean;
}
