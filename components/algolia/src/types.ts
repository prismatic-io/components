export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}
export interface AlgoliaIndex {
  name: string;
  createdAt: string;
  updatedAt: string;
  entries: number;
  dataSize: number;
  fileSize: number;
  [key: string]: unknown;
}
export interface AlgoliaChangesObject {
  created?: AlgoliaIndex[];
  updated?: AlgoliaIndex[];
}
export interface AlgoliaRecordChange {
  changeType: "created" | "updated";
  record: AlgoliaIndex;
}
