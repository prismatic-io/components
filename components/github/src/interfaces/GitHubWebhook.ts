import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
export interface GitHubWebhook {
  id: number;
  name: string;
  active: boolean;
  events: string[];
  config: {
    url: string;
  };
}
export interface FetchWebhooksInput {
  client: HttpClient;
  owner: string;
  repo: string;
  showOnlyInstanceWebhooks: boolean;
  instanceWebhookUrls: string[];
}
