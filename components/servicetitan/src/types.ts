export interface PollingState {
  lastPolledAt?: string;
}

export interface PollResourceConfig {
  label: string;
  endpoint: string;
  urlType: string;
  createdAtField: string;
  updatedAtField: string;
}

export interface ServiceTitanRecord {
  id: number;
  [key: string]: unknown;
}
