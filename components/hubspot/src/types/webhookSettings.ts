export interface WebhookSettings {
  targetUrl: string;
  throttling: {
    maxConcurrentCalls: number;
    period: string;
  };
}
