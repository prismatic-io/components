export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}

export interface MondayItem extends Record<string, unknown> {
  id: string;
  name?: string;
  created_at?: string;
  updated_at?: string;
  state?: string;
}
