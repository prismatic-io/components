export interface PollableRecord {
  id: string;
  insertedAt?: string;
  [key: string]: unknown;
}
export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}
export interface PdqChangesObject {
  created?: PollableRecord[];
}
export interface PdqRecordChange {
  changeType: "created";
  record: PollableRecord;
}
