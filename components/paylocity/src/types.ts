export interface PollingState {
  knownIds?: string[];
}

export interface PaylocityRecord {
  employeeId: string;
  [key: string]: unknown;
}
