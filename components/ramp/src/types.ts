export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
  knownIds?: string[];
}

export interface PollResourceConfig {
  label: string;
  endpoint: string;
  createdAtField: string | null;
  updatedAtField: string | null;
}

export interface RampRecord {
  id: string;
  [key: string]: unknown;
}

export interface RampChangesObject {
  created?: RampRecord[];
  updated?: RampRecord[];
}

export interface RampRecordChange {
  changeType: "created" | "updated";
  record: RampRecord;
}
