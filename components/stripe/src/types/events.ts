export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}
export interface StripeEvent extends Record<string, unknown> {
  id?: string;
  object?: string;
  type?: string;
  created?: number;
  data?: {
    object?: unknown;
  };
}
