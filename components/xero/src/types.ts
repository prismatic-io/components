export interface PollingState {
  lastPolledAt?: string;
  knownIds?: string[];
}

export type XeroRecord = Record<string, unknown>;

export interface PollResourceConfig {
  label: string;
  endpoint: string;
  responseKey: string;
  idField: string;
  paginated: boolean;
}
