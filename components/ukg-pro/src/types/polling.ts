import type { EmployeeChange } from "./employee";
export interface EmployeeChangesPollingState {
  lastPollTime?: string;
}
export interface EmployeeChangeRecordChange {
  changeType: "changed";
  record: EmployeeChange;
}
export interface NewHireStatusPollingState {
  lastStatusMap?: Record<string, NewHireStatusEntry>;
  lastPollTime?: string;
}
export interface NewHireStatusEntry {
  status: string;
  progress: number;
}
export interface NewHireStatusChange {
  newHireId: string;
  firstName: string;
  lastName: string;
  changeType: "NewHireAdded" | "StatusChange" | "ProgressUpdate";
  previousStatus?: string;
  currentStatus: string;
  previousProgress?: number;
  currentProgress?: number;
  detectedAt: string;
}
export interface NewHireStatusRecordChange {
  changeType: NewHireStatusChange["changeType"];
  record: NewHireStatusChange;
}
