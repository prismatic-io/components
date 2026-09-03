import type { DocumentNode } from "graphql";
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
