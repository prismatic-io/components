export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}
export interface SendgridMessageRecord {
  msg_id?: string;
  from_email?: string;
  to_email?: string;
  subject?: string;
  status?: string;
  last_event_time?: string;
  opens_count?: number;
  clicks_count?: number;
  api_key_id?: string;
  template_id?: string;
  [key: string]: unknown;
}
export interface MessagesResponse {
  messages?: SendgridMessageRecord[];
}
export interface FetchMessagesInWindowResult {
  records: SendgridMessageRecord[];
  truncated: boolean;
}
export interface PollingChangesObject {
  created?: SendgridMessageRecord[];
  updated?: SendgridMessageRecord[];
}
export interface SendgridRecordChange {
  changeType: "created" | "updated";
  record: SendgridMessageRecord;
}
