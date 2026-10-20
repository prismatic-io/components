export interface SageHRRecord {
  id: number | string;
  [key: string]: unknown;
}
export interface PollingState {
  knownIds: string[];
}
export interface ChangesObject {
  created?: SageHRRecord[];
  updated?: SageHRRecord[];
}
export interface RecordChange {
  changeType: "created" | "updated";
  record: SageHRRecord;
}
