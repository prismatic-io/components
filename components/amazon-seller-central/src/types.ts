export interface PollingState {
  lastPolledAt?: string;
}
export interface AmazonRecord {
  [key: string]: unknown;
}
export interface PollingChangesObject {
  created?: AmazonRecord[];
  updated?: AmazonRecord[];
}
export interface PollingRecordChange {
  changeType: "created" | "updated";
  record: AmazonRecord;
}
