export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}
export interface PipedriveRecentItem {
  item?: string;
  id: number;
  data: Record<string, unknown>;
}
export interface PollResourceConfig {
  createdAtField: string | null;
  updatedAtField: string | null;
}
export interface PollingChangesObject {
  created: PipedriveRecentItem[];
  updated: PipedriveRecentItem[];
}
export interface PollingRecordChange {
  changeType: "created" | "updated";
  record: PipedriveRecentItem;
}
