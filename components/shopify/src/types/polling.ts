import type { DocumentNode } from "graphql";
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
export interface PollingChangesObject<T> {
  created: T[];
  updated: T[];
}
export interface PollingRecordChange<T> {
  changeType: "created" | "updated";
  record: T;
}
export interface PollingResource {
  listKey: string;
  query: DocumentNode;
}
