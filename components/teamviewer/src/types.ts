export interface PollingState {
  knownIds?: string[];
}

export interface TeamViewerRecord {
  id: string;
  [key: string]: unknown;
}
