export interface PollingState {
  lastPolledAt?: string;
  knownIds?: string[];
}
export interface QBTimeRecord {
  id: number;
  [key: string]: unknown;
}
export interface QBTimeRecordChanges {
  created: QBTimeRecord[];
  updated: QBTimeRecord[];
}
export interface QBTimeRecordChange {
  changeType: "created" | "updated";
  record: QBTimeRecord;
}
