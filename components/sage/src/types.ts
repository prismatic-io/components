export interface PollingState {
  lastPolledAt?: string;
}

export interface SageRecord {
  id: string;
  [key: string]: unknown;
}

export interface PollResourceConfig {
  label: string;
  endpoint: string;
}
