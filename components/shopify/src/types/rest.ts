export interface RestAddress {
  address1: string;
  id?: number;
  customer_id?: number;
  first_name?: string;
  last_name?: string;
  company?: string;
  address2?: string;
  city?: string;
  province?: string;
  country?: string;
  zip?: string;
  phone?: string;
  name?: string;
  province_code?: string;
  country_code?: string;
  country_name?: string;
  default?: boolean;
}

export interface MailingAddressInput {
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  provinceCode: string;
  countryCode: string;
  zip: string;
  phone: string;
}
