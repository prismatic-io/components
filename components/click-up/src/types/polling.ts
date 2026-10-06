import type { POLL_SCOPE_TYPES } from "../constants";
export type PollScopeType = (typeof POLL_SCOPE_TYPES)[number];
export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}
export interface ClickUpTask {
  id: string;
  date_created?: string;
  date_updated?: string;
  [key: string]: unknown;
}
export interface ClickUpTaskPage {
  tasks: ClickUpTask[];
}
export interface PartitionedTasks {
  created: ClickUpTask[];
  updated: ClickUpTask[];
}
export interface ClickUpTaskChangesObject {
  created: ClickUpTask[];
  updated: ClickUpTask[];
}
export interface ClickUpTaskChange {
  changeType: "created" | "updated";
  record: ClickUpTask;
}
export interface PollingWindowStart {
  sinceMs: number;
  isInitialSync: boolean;
}
