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
