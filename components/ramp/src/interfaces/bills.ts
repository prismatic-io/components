export interface Bill {
  accounting_field_selections: Record<string, unknown>[];
  amount: Amount;
  created_at: string;
  deep_link_url: string | null;
  due_at: string;
  entity_id: string;
  id: string;
  invoice_number: string;
  invoice_urls: string[];
  issued_at: string;
  line_items: LineItem[];
  payment: Payment;
  remote_id: string | null;
  status: string;
  user: User;
  vendor: Vendor;
}

interface Amount {
  amount: number;
  currency_code: string;
}

interface LineItem {
  accounting_field_selections: Record<string, unknown>[];
  amount: Amount;
  memo: string;
}

interface Payment {
  amount: Amount;
  effective_date: string;
  payment_date: string;
  payment_method: string;
}

interface User {
  first_name: string;
  id: string;
  last_name: string;
}

interface Vendor {
  remote_id: string;
  remote_name: string;
  type: string;
}
