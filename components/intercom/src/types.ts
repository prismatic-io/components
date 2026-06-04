export interface PollingState {
  lastPolledAt?: string;
}

export interface IntercomRecord {
  id: string;
  created_at: number;
  updated_at: number;
  [key: string]: unknown;
}
