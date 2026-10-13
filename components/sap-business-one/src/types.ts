export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}
export interface SAPBusinessOneRecord extends Record<string, unknown> {
  CreateDate?: string;
  UpdateDate?: string;
}
export interface PollingChangesObject {
  created: SAPBusinessOneRecord[];
  updated: SAPBusinessOneRecord[];
}
export interface PollingRecordChange {
  changeType: "created" | "updated";
  record: SAPBusinessOneRecord;
}
