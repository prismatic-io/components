export interface UpdateWebhookBody {
  endpoint: string;
  status: string;
  events?: string[] | string;
}
