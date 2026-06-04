export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}

export interface ClickUpTask {
  id: string;
  
  date_created?: string;
  date_updated?: string;
  [key: string]: unknown;
}
