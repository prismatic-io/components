import type { KeyValuePair } from "@prismatic-io/spectral";

export type ObjectType = Record<string, unknown>;

export interface SearchCriteria {
  conditionsCriteria: KeyValuePair<unknown>[];
  conditionsCriteriaValue: KeyValuePair<unknown>[];
}

export interface MapModel {
  label: string;
  value: string;
}

export interface Asset {
  loan: Loan;
  retain_user_site: boolean;
  type: Type;
  last_updated_by: CreatedBy;
  id: string;
  purchase_cost: number;
  state: Category;
  barcode: string;
  created_time: CreatedTime;
  product: Product;
  created_by: CreatedBy;
  site: Site;
  product_type: ProductType;
  last_updated_time: CreatedTime;
  name: string;
  location: string;
  is_loanable: boolean;
  category: Category;
  state_history_comments: string;
}

export interface Category {
  name: string;
  description: string;
  id: string;
}

export interface CreatedBy {
  email_id: string;
  is_technician: boolean;
  sms_mail: string;
  phone: string;
  name: string;
  mobile: string;
  id: string;
  photo_url: string;
  is_vip_user: boolean;
}

export interface CreatedTime {
  display_value: string;
  value: string;
}

export interface Loan {
  start_time: CreatedTime;
  id: string;
  returned_time: CreatedTime;
  barcode: string;
  due_by_time: CreatedTime;
  loan_id: CreatedTime;
}

export interface Product {
  part_no: string;
  name: string;
  id: string;
  manufacturer: string;
}

export interface ProductType {
  image: string;
  name: string;
  id: string;
}

export interface Site {
  deleted: boolean;
  name: string;
  id: string;
}

export interface Type {
  name: string;
  id: string;
}

export interface Problem {
  title: string;
  description: string;
  id: string;
}

export interface Request {
  subject: string;
  description: string;
  id: string;
}
