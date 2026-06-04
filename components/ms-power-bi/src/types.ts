export interface PollingState {
  lastPolledAt?: string;
  knownIds?: string[];
}

export interface PollResourceConfig {
  label: string;
  endpoint: string;
  createdAtField: string | null;
}

export interface PowerBIRecord {
  id: string;
  [key: string]: unknown;
}
