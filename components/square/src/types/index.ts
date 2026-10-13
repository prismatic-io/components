export interface Payment extends Record<string, unknown> {
  id?: string;
  created_at?: string;
  updated_at?: string;
}
export interface PaymentChangesObject {
  created?: Payment[];
  updated?: Payment[];
}
export interface PaymentChange {
  changeType: "created" | "updated";
  record: Payment;
}
export interface PollingBoundary {
  watermark: string;
  ids: string[];
}
export interface PollingCursor extends Record<string, unknown> {
  afterCursor: string;
  windowStart: string;
  pending: PollingBoundary;
}
export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
  boundaryIds?: string[];
  cursor?: PollingCursor;
  backfillActive?: boolean;
}
