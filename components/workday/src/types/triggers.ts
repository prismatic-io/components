export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
  seen?: string[];
  watermark?: string;
}
export type WorkdayRecord = Record<string, unknown>;
export type WatermarkFormat = "dateTime" | "date";
export interface RecordChangesObject {
  changed?: WorkdayRecord[];
}
export interface RecordSelection {
  changed: WorkdayRecord[];
  seen: string[];
}
export interface RecordChange {
  changeType: "changed";
  record: WorkdayRecord;
}
export interface WorkdayEventStep {
  id: string;
  descriptor?: string;
  creationDate?: string;
  [key: string]: unknown;
}
export interface EventStepChangesObject {
  created?: WorkdayEventStep[];
}
export interface EventStepSelection {
  created: WorkdayEventStep[];
  seen: string[];
}
export interface EventStepChange {
  changeType: "created";
  record: WorkdayEventStep;
}
export interface PollingWindow {
  since: string;
  isInitialSync: boolean;
  isBaseline: boolean;
}
export interface EventStepFilters {
  createdOnOrAfter: string;
  businessProcess?: string[];
  stepType?: string[];
}
export interface WqlCursor {
  watermark: string;
  seen?: string[];
}
export interface WqlCursorOptions {
  dateField: string;
  recordKeyField: string;
  floor: string;
  overlapMs: number;
}
