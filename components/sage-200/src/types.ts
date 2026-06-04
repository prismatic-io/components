
export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}


export interface Sage200Record {
  
  date_time_created?: string;
  
  date_time_updated?: string;
  [key: string]: unknown;
}
