export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}

export interface BillRecord {
  id: string;
  createdTime: string;
  updatedTime: string;
  [key: string]: unknown;
}

export interface BillFilter {
  field: string;
  op: string;
  value: string;
}
