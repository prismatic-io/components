import type { CreateApiPaginationResponse } from "../types";


interface Address {
  id?: number;
  zip?: string;
  city: string;
  name?: string;
  country: string;
  address1?: string;
  address2?: string;
  province?: string;
  last_name: string;
  first_name: string;
  line_1?: string;
  line_2?: string;
  zip_code?: string;
  created_datetime?: string;
  updated_datetime?: string;
  deleted_datetime?: string;
  external_id?: string;
  state?: string;
  preferred?: boolean;
  phone_number?: string;
  shopper_external_id?: string;
  country_code?: string;
  province_code?: string;
  default?: boolean;
  customer_id?: number;
  country_name?: string;
}


interface Price {
  amount: string;
  currency_code: string;
}


interface PriceSet {
  shop_money: Price;
  presentment_money: Price;
}


interface TaxLine {
  rate: number;
  price: string;
  title: string;
  price_set: PriceSet;
}


interface LineItem {
  id: number;
  unit_price?: string;
  discount_type?: string;
  discount_reason?: string;
  total_amount?: string;
  fulfilled_quantity?: number;
  updated_datetime?: string;
  discount_amount?: string;
  sku?: string;
  name?: string;
  grams?: number;
  price?: string;
  title: string;
  taxable: boolean;
  quantity: number;
  price_set?: PriceSet;
  tax_lines?: TaxLine[];
  product_id?: number;
  variant_id?: number;
  total_discount?: string;
  requires_shipping: boolean;
  fulfillment_status?: string | null;
  total_discount_set?: PriceSet;
  fulfillment_service?: string;
  fulfillable_quantity?: number;
  product_options?: ProductOptions;
  deleted_datetime?: string;
  created_datetime?: string;
}

interface ProductOptions {
  size: number;
}


interface Order {
  id: number;
  total_tax: string;
  created_at: string;
  line_items: LineItem[];
  contact_email: string;
  billing_address: Address;
}


interface BaseCustomer {
  id: number;
  note: string;
  name?: string;
  tags?: string;
  email: string;
  firstname: string;
  lastname: string;
  orders_count?: number;
  default_address?: Address;
  created_datetime?: string;
  external_id?: string;
}


interface Integration {
  orders: Order[];
  customer: BaseCustomer;
  __integration_type__: string;
}


interface Store {
  id: number;
  type: string;
  helpdesk_integration_id: number;
  default_currency: string;
  url: string;
  updated_datetime: string;
  currencies: string[];
  display_name: string;
  created_datetime: string;
  name: string;
  deleted_datetime: string;
  uuid: string;
}


interface Shopper {
  id: number;
  first_name: string;
  helpdesk_customer_id: number;
  updated_datetime: string;
  phone_number: string;
  middle_name: string;
  deleted_datetime: string;
  birthdate: string;
  status: string;
  external_id: string;
  email_address: string;
  accepts_marketing_sms: boolean;
  accepts_marketing_email: boolean;
  last_name: string;
  created_datetime: string;
}


interface ExternalData {
  badge: string;
  points: number;
  __app_name__: string;
}


interface EcommerceOrder {
  external_status: string;
  total_amount: string;
  number: number;
  billing_address: Address;
  tax_amount: string;
  discount_codes: string[];
  line_items: LineItem[];
  status: string;
  external_fulfillment_status: string;
  payment_status: string;
  shopper_external_id: string;
  external_payment_status: string;
  name: string;
  currency: string;
  created_datetime: string;
  id: number;
  updated_datetime: string;
  subtotal_amount: string;
  deleted_datetime: string;
  external_id: string;
  shipping_address: Address;
  discount_amount: string;
  shipping_amount: string;
}


interface EcommerceData {
  store: Store;
  shopper: Shopper;
  orders: EcommerceOrder[];
  addresses: Address[];
}


export interface CreateCustomerResponse extends BaseCustomer {
  integrations: Record<string, Integration>;
  language: string;
  timezone: string;
  updated_datetime: string;
}


export interface GetCustomerResponse extends BaseCustomer {
  channels: { id: number }[];
  integrations: Record<string, Integration>;
  language: string;
  timezone: string;
  updated_datetime: string;
  external_data: Record<string, ExternalData>;
  ecommerce_data: Record<string, EcommerceData>;
}


export interface UpdateCustomerResponse extends BaseCustomer {
  integrations: Record<string, Integration>;
  language: string;
  timezone: string;
  updated_datetime: string;
}


export type ListCustomersResponse = CreateApiPaginationResponse<{
  id: number;
  created_datetime: string | null;
  email: string | null;
  external_id: string | null;
  firstname: string;
  language: string | null;
  lastname: string;
  name: string | null;
  timezone: string | null;
  updated_datetime: string | null;
}>;
