export interface CreateWebhookBody {
  endpoint: string;
  events?: string[];
  space_id?: number;
  folder_id?: number;
  list_id?: number;
  task_id?: string;
}
export interface UpdateWebhookBody {
  endpoint: string;
  status: string;
  events?: string[] | string;
}
