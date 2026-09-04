export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}
export interface DynamicsRecord extends Record<string, unknown> {
  createdon?: string;
  modifiedon?: string;
}
export interface DynamicsChangesObject {
  created?: DynamicsRecord[];
  updated?: DynamicsRecord[];
}
export interface DynamicsRecordChange {
  changeType: "created" | "updated";
  record: DynamicsRecord;
}
