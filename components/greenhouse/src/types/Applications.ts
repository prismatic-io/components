export interface Application extends Record<string, unknown> {
  id: number;
  created_at?: string;
  last_activity_at?: string;
}

export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}
