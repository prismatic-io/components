import type { WebhookTopic } from "./types/WebhookTopic";

export const WEBHOOK_TOPICS = new Set<WebhookTopic>([
  "order_shipped",
  "shipment_delivered",
  "shipment_exception",
  "shipment_onhold",
  "shipment_cancelled",
]);

export const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
