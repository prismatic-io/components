export type PollingState = {
  afterCursor?: string;
  lastPolledAt?: string;
  backfillActive?: boolean;
};
export type PollingCursor = {
  afterCursor: string;
};
