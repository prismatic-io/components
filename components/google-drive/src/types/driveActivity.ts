export interface SearchRecordsPollingState {
  lastPolledAt?: string;
}
export interface ActivityPaginationState extends Record<string, unknown> {
  ancestorIndex: number;
  windowStart: string;
  cycleEnd: string;
  pageToken?: string;
}
