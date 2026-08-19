import type { Connection } from "@prismatic-io/spectral";
export interface PollingTriggerObject {
  id: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}
export interface PollingChangesObject {
  createdRecords: PollingTriggerObject[];
  updatedRecords: PollingTriggerObject[];
}
export interface PollingRecordChange {
  changeType: "created" | "updated";
  record: PollingTriggerObject;
}
export interface SearchObjectParams {
  timeout: number;
  hubspotConnection: Connection;
  searchEndpoint?: string;
  searchProperties: object;
  objectType?: string;
  fetchAll: boolean;
  searchLimit: number;
}
