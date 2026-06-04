export interface Order {
  id: string;
  parent: string;
  currenct: string;
  version: string;
  prices_include_tax: boolean;
  date_created: string;
  date_mofdified: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  customer_id: string;
  order_key: string;
}
