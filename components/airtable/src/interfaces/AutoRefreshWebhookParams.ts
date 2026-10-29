import type { ActionLogger } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";

export interface AutoRefreshWebhookParams {
  client: HttpClient;
  baseId: string;
  webhookId: string;
  expirationTime: string;
  logger: ActionLogger;
  debug: boolean;
}
