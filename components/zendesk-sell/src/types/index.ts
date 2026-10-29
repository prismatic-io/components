export interface PollingState {
  lastPolledAt?: string;
}

export interface ZendeskSellRecord {
  id: number;
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
}

export interface ZendeskSellResponse {
  items: unknown[];
  meta?: {
    links?: {
      next_page?: string;
    };
  };
}

export interface ZendeskSellRecordChanges {
  created: ZendeskSellRecord[];
  updated: ZendeskSellRecord[];
}

export interface ZendeskSellRecordChange {
  changeType: "created" | "updated";
  record: ZendeskSellRecord;
}

export interface PollWindow {
  lastPolledAt: string;
  includeNew: boolean;
  includeUpdated: boolean;
}
