export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
  lastSeenIds?: number[];
  backfillActive?: boolean;
}
export interface PollResourceConfig {
  label: string;
  endpoint: string;
  urlType: string;
  createdAtField: string;
  updatedAtField: string;
  sortField?: string;
}
export interface ServiceTitanRecord {
  id: number;
  [key: string]: unknown;
}
export interface PollingChangesObject {
  created: ServiceTitanRecord[];
  updated: ServiceTitanRecord[];
}
export interface PollingRecordChange {
  changeType: "created" | "updated";
  record: ServiceTitanRecord;
}
