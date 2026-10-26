export interface Shop {
  id: string | null;
  name: string | null;
  email: string | null;
  myshopifyDomain: string | null;
  billingAddress: {
    province: string | null;
    countryCodeV2: string | null;
    address1: string | null;
    zip: string | null;
    city: string | null;
    phone: string | null;
    latitude: number | null;
    longitude: number | null;
    address2: string | null;
    country: string | null;
    provinceCode: string | null;
  } | null;
  createdAt: string | null;
  updatedAt: string | null;
  currencyCode: string | null;
  timezoneOffset: string | null;
  ianaTimezone: string | null;
  shopOwnerName: string | null;
  currencyFormats: {
    moneyFormat: string | null;
    moneyWithCurrencyFormat: string | null;
    moneyInEmailsFormat: string | null;
    moneyWithCurrencyInEmailsFormat: string | null;
  } | null;
  weightUnit: string | null;
  taxesIncluded: boolean | null;
  taxShipping: boolean | null;
  plan: {
    displayName: string | null;
  } | null;
  checkoutApiSupported: boolean | null;
  setupRequired: boolean | null;
  enabledPresentmentCurrencies: string[] | null;
  marketingSmsConsentEnabledAtCheckout: boolean | null;
  transactionalSmsDisabled: boolean | null;
}
