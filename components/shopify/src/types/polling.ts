import type { TriggerPayload } from "@prismatic-io/spectral";
import type { DocumentNode } from "graphql";

export interface PollingCursor extends Record<string, unknown> {
  windowStart: string;
  windowEnd: string;
  isBackfill: boolean;
  after?: string;
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

export interface PollingPage<T> {
  records: T[];
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface PollingCycleResult {
  payload: TriggerPayload<PollingCursor>;
  polledNoChanges: boolean;
}
