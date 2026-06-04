export interface PollingState {
  lastPolledAt?: string;
}

export interface AmazonRecord {
  [key: string]: unknown;
}
