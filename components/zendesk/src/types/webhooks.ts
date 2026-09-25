import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
export interface ZendeskWebhook {
  id: string;
  name: string;
  description: string;
  status: string;
  subscriptions: string[];
  created_at: string;
  created_by: number;
  endpoint: string;
  http_method: string;
  request_format: string;
}
export interface FetchWebhooksInput {
  client: HttpClient;
  showOnlyInstanceWebhooks: boolean;
  instanceWebhookUrls: string[];
}
