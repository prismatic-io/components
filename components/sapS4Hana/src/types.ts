export interface PollingState {
  lastPolledAt?: string;
}

export interface SapRecord {
  [key: string]: unknown;
}

export interface PollResourceConfig {
  label: string;
  endpoint: string;
  filterField: string;
  createdAtField: string;
  updatedAtField: string;
}

export interface PollingChangesObject {
  created: SapRecord[];
  updated: SapRecord[];
}

export interface PollingRecordChange {
  changeType: "created" | "updated";
  record: SapRecord;
}
