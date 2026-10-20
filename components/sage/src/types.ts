export interface PollingState {
  lastPolledAt?: string;
}
export interface SageRecord {
  id: string;
  [key: string]: unknown;
}
export interface PollResourceConfig {
  label: string;
  endpoint: string;
}
export interface SageChangesObject {
  created?: SageRecord[];
  updated?: SageRecord[];
}
export interface SageRecordChange {
  changeType: "created" | "updated";
  record: SageRecord;
}
