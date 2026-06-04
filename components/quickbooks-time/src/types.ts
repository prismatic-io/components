export interface PollingState {
  lastPolledAt?: string;
  knownIds?: string[];
}

export interface QBTimeRecord {
  id: number;
  [key: string]: unknown;
}
