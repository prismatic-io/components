import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";

export interface WebhookExistsParams {
  client: HttpClient;
  baseId: string;
  webhookId: string;
}
