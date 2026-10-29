export interface PollingState {
  lastPolledAt?: string;
}

export interface IntercomRecord {
  id: string;
  created_at: number;
  updated_at: number;
  [key: string]: unknown;
}

export interface PollingChangesObject {
  created: IntercomRecord[];
  updated: IntercomRecord[];
}

export interface PollingRecordChange {
  changeType: "created" | "updated";
  record: IntercomRecord;
}

export interface PollWindow {
  lastPolledUnix: number;
  searchSinceUnix: number;
  isBackfill: boolean;
}
