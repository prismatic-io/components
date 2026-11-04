import type { ActionLogger } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/http";

export interface ListWebhookPayloadsParams {
  client: HttpClient;
  baseId: string;
  webhookId: string;
  lastCursor: number | undefined;
  logger: ActionLogger;
  debug: boolean;
}
