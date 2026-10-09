export interface PollingState {
  lastPolledAt?: string;
  knownIds?: string[];
}
export interface GongRecord {
  id: string;
  [key: string]: unknown;
}
export interface GongListResponse {
  records: {
    totalRecords: number;
    currentPageSize: number;
    currentPageNumber: number;
    cursor?: string;
  };
  [key: string]: unknown;
}
export interface PollingChangesObject {
  created?: GongRecord[];
  updated?: GongRecord[];
}
export interface PollingRecordChange {
  changeType: "created" | "updated";
  record: GongRecord;
}
