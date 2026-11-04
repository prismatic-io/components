interface Address {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  company: string | null;
  address1: string | null;
  address2: string | null;
  city: string | null;
  province: string | null;
  country: string | null;
  zip: string | null;
  phone: string | null;
  name: string | null;
  provinceCode: string | null;
  countryCodeV2: string | null;
}

interface Order {
  id: string | null;
  name: string | null;
}

interface MarketingConsent {
  marketingState: string | null;
  marketingOptInLevel: string | null;
  consentUpdatedAt: string | null;
}

interface SmsMarketingConsent extends MarketingConsent {
  consentCollectedFrom: string | null;
}

export interface Customer {
  id: string | null;
  email: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  firstName: string | null;
  lastName: string | null;
  state: string | null;
  lastOrder: Order | null;
  note: string | null;
  verifiedEmail: boolean | null;
  multipassIdentifier: string | null;
  taxExempt: boolean | null;
  tags: string[] | null;
  phone: string | null;
  addresses: Address[] | null;
  taxExemptions: string[] | null;
  emailMarketingConsent: MarketingConsent | null;
  smsMarketingConsent: SmsMarketingConsent | null;
  defaultAddress: Address | null;
}

interface RestCustomerAddress {
  id: number | null;
  customer_id: number | null;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  address1: string | null;
  address2: string | null;
  city: string | null;
  province: string | null;
  country: string | null;
  zip: string | null;
  phone: string | null;
  name: string | null;
  province_code: string | null;
  country_code: string | null;
  country_name: string | null;
}

interface RestCustomerSmsMarketingConsent {
  state: string | null;
  opt_in_level: string | null;
  consent_updated_at: string | null;
  consent_collected_from: string | null;
}

export interface RestCustomer {
  id: number | null;
  email: string | null;
  created_at: string | null;
  updated_at: string | null;
  first_name: string | null;
  last_name: string | null;
  state: string | null;
  last_order_id: number | null;
  note: string | null;
  verified_email: boolean | null;
  multipass_identifier: string | null;
  tax_exempt: boolean | null;
  tags: string | null;
  last_order_name: string | null;
  phone: string | null;
  addresses: RestCustomerAddress[] | null;
  tax_exemptions: string[] | null;
  email_marketing_consent: {
    state: string | null;
    opt_in_level: string | null;
    consent_updated_at: string | null;
  } | null;
  sms_marketing_consent: RestCustomerSmsMarketingConsent | null;
  admin_graphql_api_id: string | null;
  default_address: RestCustomerAddress;
}
