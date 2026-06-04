export interface PollingState {
  lastPolledAt?: string;
}

export interface AlgoliaIndex {
  name: string;
  createdAt: string;
  updatedAt: string;
  entries: number;
  dataSize: number;
  fileSize: number;
  [key: string]: unknown;
}
