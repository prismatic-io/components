export interface Payment extends Record<string, unknown> {
  id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}
