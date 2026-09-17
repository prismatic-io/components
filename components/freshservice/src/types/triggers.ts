export type TicketPaginationState = {
  page: number;
  windowStart: string;
  windowEnd: string;
  maxPages: number;
};
export interface PollingState {
  lastPolledAt?: string;
  inFlightCursor?: TicketPaginationState;
}
export interface FreshserviceRecord {
  id: number;
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
}
export interface FreshserviceChangesObject {
  created: FreshserviceRecord[];
  updated: FreshserviceRecord[];
}
export interface FreshserviceRecordChange {
  changeType: "created" | "updated";
  record: FreshserviceRecord;
}
