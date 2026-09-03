export interface PollingCursor extends Record<string, unknown> {
  windowStart: string;
  windowEnd: string;
  after?: string;
  isBackfill: boolean;
}
export interface PollingState {
  lastPolledAt?: string;
  cursor?: PollingCursor;
}
