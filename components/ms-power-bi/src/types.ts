export interface PollingState {
  lastPolledAt?: string;
  knownIds?: string[];
}

export interface PollResourceConfig {
  label: string;
  endpoint: string;
  createdAtField: string | null;
}

export interface PowerBIRecord {
  id: string;
  [key: string]: unknown;
}

export interface PowerBIChangesObject {
  created: unknown[];
  updated: unknown[];
}

export interface PowerBIRecordChange {
  changeType: "created" | "updated";
  record: unknown;
}
