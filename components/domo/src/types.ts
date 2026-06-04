export interface PollingState {
  lastPolled?: string;
  knownIds?: (string | number)[];
}

export interface ResourceConfig {
  label: string;
  endpoint: string;
  maxPerPage: number;
  createdAtField: string | null;
  updatedAtField: string | null;
}

export interface DomoRecord {
  id: string | number;
  [key: string]: unknown;
}
