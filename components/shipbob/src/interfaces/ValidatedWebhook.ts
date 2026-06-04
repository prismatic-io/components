import type { WebhookTopic } from "../types/WebhookTopic";

export interface ValidatedWebhook {
  shipbobSubscriptionId: string;
  shipbobTopic: WebhookTopic;
}
