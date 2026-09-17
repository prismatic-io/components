export type PollingState = {
  lastPolledAt?: string;
};
export interface ChangeRecord {
  sys_created_on: string;
  sys_updated_on: string;
  [key: string]: unknown;
}
export interface PollingChangesObject {
  created?: ChangeRecord[];
  updated?: ChangeRecord[];
}
export interface PollingRecordChange {
  changeType: "created" | "updated";
  record: ChangeRecord;
}
