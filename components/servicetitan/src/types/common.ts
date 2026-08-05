export interface Address {
  street: string;
  unit: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  latitude: number;
  longitude: number;
}
export interface CustomField {
  typeId: number;
  name: string;
  value: string;
}
export interface ExternalData {
  key: string;
  value: string;
}
export interface ListGeneric<T> {
  page: number;
  pageSize: number;
  hasMore: boolean;
  totalCount: number;
  data: T[];
}
export interface AssignedTo {
  id: number;
  name: string;
}
export interface Batch {
  id: number;
  number: string;
  name: string;
}
