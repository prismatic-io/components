export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
  backfillActive?: boolean;
  endCursor?: string;
  streamStartedAt?: string;
  pollResourceType?: string;
}
