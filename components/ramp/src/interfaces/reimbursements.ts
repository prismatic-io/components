export interface Reimbursement {
  accounting_field_selections: AccountingFieldSelection[];
  amount: number;
  created_at: string;
  currency: string;
  direction: string;
  distance: number;
  entity_id: string;
  id: string;
  line_items: LineItem[];
  memo: string;
  merchant: string;
  original_reimbursement_amount: Amount;
  payee_amount: Amount;
  payment_id: string;
  receipts: Record<string, unknown>[];
  spend_limit_id: string;
  state: string;
  synced_at: string;
  transaction_date: string;
  trip_id: string;
  type: string;
  updated_at: string;
  user_email: string;
  user_full_name: string;
  user_id: string;
}

interface AccountingFieldSelection {
  category_info?: AccountingFieldSelection;
  external_id: string;
  id: string;
  name: string;
  type: string;
}

interface LineItem {
  accounting_field_selections: AccountingFieldSelection[];
  amount: Amount;
}

interface Amount {
  amount: number;
  currency_code: string;
}
