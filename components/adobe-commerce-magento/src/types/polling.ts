export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}
export interface MagentoRecord extends Record<string, unknown> {
  created_at?: string;
  updated_at?: string;
}
