export interface PollingState {
  lastPolledAt?: string;
  knownIds?: string[];
}

export interface PollResourceConfig {
  label: string;
  endpoint: string;
  createdAtField: string | null;
  updatedAtField: string | null;
}

export interface RampRecord {
  id: string;
  [key: string]: unknown;
}
