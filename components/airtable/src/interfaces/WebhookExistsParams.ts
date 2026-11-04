import type { HttpClient } from "@prismatic-io/spectral/http";

export interface WebhookExistsParams {
  client: HttpClient;
  baseId: string;
  webhookId: string;
}
