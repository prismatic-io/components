export interface Customer {
  id: string;
  email: string;
}
export interface Invoice {
  id: string;
  amount: number;
  currency: string;
  description: string;
}
export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  description: string;
}
export interface Price {
  nickname: string;
  id: string;
  currency: string;
  type: string;
}
export interface Product {
  id: string;
  name: string;
  description: string;
}
export interface Subscription {
  id: string;
  collection_method: string;
  description: string;
}
