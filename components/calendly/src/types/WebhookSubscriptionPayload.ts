import type { Pagination } from "./Pagination";
import type { Webhook } from "./Webhook";

export interface WebhookSubscriptionPayload {
  collection: Webhook[];
  pagination: Pagination;
}
