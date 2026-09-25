import type { Task } from "./resources";
export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
  lastSeenIds?: string[];
  isBackfill?: boolean;
}
export interface PollingChangesObject {
  created?: Task[];
  updated?: Task[];
}
export interface PollingRecordChange {
  changeType: "created" | "updated";
  record: Task;
}
export interface BatchedPoll {
  created: Task[];
  updated: Task[];
  nextState: PollingState;
  complete: boolean;
}
