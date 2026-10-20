import type { POLL_RESOURCE_CONFIG } from "../constants";
import type { GitlabRecord } from "./resources";
export type PollResourceType = keyof typeof POLL_RESOURCE_CONFIG;
export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
  lastSeenIds?: string[];
  isBackfill?: boolean;
}
export interface PollingChangesObject {
  created?: GitlabRecord[];
  updated?: GitlabRecord[];
}
export interface PollingRecordChange {
  changeType: "created" | "updated";
  record: GitlabRecord;
}
export interface PlannedPoll {
  created: GitlabRecord[];
  updated: GitlabRecord[];
  nextState: PollingState;
  complete: boolean;
}
