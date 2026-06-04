export interface PollingState {
  knownIds: string[];
}

export interface SDPRecord {
  id: string;
  [key: string]: unknown;
}
