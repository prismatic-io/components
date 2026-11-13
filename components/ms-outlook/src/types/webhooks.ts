export type WebhookResourceType = "event" | "message";

export interface WebhookResourceConfig {
  endpoint: string;
  dataKey: string;
}
