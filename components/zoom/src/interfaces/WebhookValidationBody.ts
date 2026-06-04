export interface WebhookValidationBody {
  event: string;
  payload: Record<string, string>;
  event_ts: number;
}
