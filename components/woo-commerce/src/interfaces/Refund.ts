export interface Refund {
  id: string;
  amount: string;
  reason: string;
  refunded_by: string;
  parent_id: string;
}
