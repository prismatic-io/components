export interface SageHRRecord {
  id: number | string;
  [key: string]: unknown;
}

export interface PollingState {
  knownIds: string[];
}
