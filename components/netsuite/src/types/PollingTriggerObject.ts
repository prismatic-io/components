export interface PollingTriggerObject {
  datecreated: string;
  lastmodifieddate: string;
  id: string | number;
  [key: string]: unknown;
}
export interface PollingChangesObject {
  createdRecords?: PollingTriggerObject[];
  updatedRecords?: PollingTriggerObject[];
}
export interface PollingRecordChange {
  changeType: "created" | "updated";
  record: PollingTriggerObject;
}
