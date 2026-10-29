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
