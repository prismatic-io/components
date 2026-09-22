import type { PollingTriggerObject } from "./PollingTriggerObject";
export interface NetSuitePollingState {
  lastPolledAt: string;
}
export interface PollingChangesResult {
  changesObject: {
    createdRecords?: PollingTriggerObject[];
    updatedRecords?: PollingTriggerObject[];
  };
  changes: number;
}
export interface PollingQueryParams {
  lookBackDate?: string;
  additionalFilter?: string;
}
export interface BuiltPollingQuery {
  query: string;
  lastPolledAt: string;
  isInitialSync: boolean;
}
