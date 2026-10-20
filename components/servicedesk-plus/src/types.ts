export interface PollingState {
  knownIds: string[];
}
export interface SDPRecord {
  id: string;
  [key: string]: unknown;
}
export interface SDPChangesObject {
  created?: SDPRecord[];
  updated?: SDPRecord[];
}
export interface SDPRecordChange {
  changeType: "created" | "updated";
  record: SDPRecord;
}
