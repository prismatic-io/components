import type { KlaviyoApi } from "../constants";
export interface PollingState {
  lastPolledAt?: string;
}
export interface KlaviyoRecord {
  id: string;
  type: string;
  attributes: Record<string, unknown>;
  [key: string]: unknown;
}
export interface PollResourceConfig {
  label: string;
  api: KlaviyoApi;
  createdAtField: string;
  updatedAtField: string;
  createdAtAttr?: string;
  updatedAtAttr?: string;
}
export type KlaviyoPollableResource = "profiles" | "lists";
export interface PollingRecordChange {
  changeType: "created" | "updated";
  record: KlaviyoRecord;
}
export interface PollingChangesObject {
  created?: KlaviyoRecord[];
  updated?: KlaviyoRecord[];
}
