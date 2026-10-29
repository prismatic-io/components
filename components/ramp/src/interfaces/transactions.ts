export interface Transaction {
  accounting_categories: Record<string, unknown>[];
  accounting_field_selections: AccountingFieldSelection[];
  amount: number;
  card_holder: CardHolder;
  card_id: string;
  currency_code: string;
  disputes: Record<string, unknown>[];
  entity_id: string;
  id: string;
  line_items: LineItem[];
  memo: string | null;
  merchant_category_code: string | null;
  merchant_category_code_description: string | null;
  merchant_data: MerchantData;
  merchant_descriptor: string;
  merchant_id: string;
  merchant_location: MerchantLocation;
  merchant_name: string;
  original_transaction_amount: Amount;
  policy_violations: Record<string, unknown>[];
  receipts: Record<string, unknown>[];
  settlement_date: string;
  sk_category_id: string;
  sk_category_name: string;
  state: string;
  synced_at: string;
  trip_id: string;
  trip_name: string;
  user_transaction_time: string;
}

interface AccountingFieldSelection {
  category_info?: AccountingFieldSelection;
  external_id: string;
  id: string;
  name: string;
  type: string;
}

interface CardHolder {
  department_id: string;
  department_name: string;
  first_name: string;
  last_name: string;
  location_id: string;
  location_name: string;
  user_id: string;
}

interface LineItem {
  accounting_field_selections: AccountingFieldSelection[];
  amount: Amount;
}

interface Amount {
  amount: number;
  currency_code: string;
}

interface MerchantData {
  auto_rental: string | null;
  flight: string | null;
  fuel: string | null;
  lodging: string | null;
  receipt: Receipt[];
  reference: string;
}

interface Receipt {
  commodity_code: string | null;
  description: string;
  discount: string | null;
  quantity: number;
  tax: string | null;
  total: number;
  unit_cost: number;
}

interface MerchantLocation {
  city: string;
  country: string;
  postal_code: string;
  state: string;
}
