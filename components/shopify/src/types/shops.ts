interface ShopBillingAddress {
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
}

interface ShopCurrencyFormats {
  moneyFormat: string | null;
  moneyWithCurrencyFormat: string | null;
  moneyInEmailsFormat: string | null;
  moneyWithCurrencyInEmailsFormat: string | null;
}

export interface Shop {
  id: string | null;
  name: string | null;
  email: string | null;
  myshopifyDomain: string | null;
  billingAddress: ShopBillingAddress | null;
  createdAt: string | null;
  updatedAt: string | null;
  currencyCode: string | null;
  timezoneOffset: string | null;
  ianaTimezone: string | null;
  shopOwnerName: string | null;
  currencyFormats: ShopCurrencyFormats | null;
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

export interface RestShop {
  id: number | null;
  name: string | null;
  email: string | null;
  domain: string | null;
  province: string | null;
  country: string | null;
  address1: string | null;
  zip: string | null;
  city: string | null;
  phone: string | null;
  latitude: number | null;
  longitude: number | null;
  address2: string | null;
  created_at: string | null;
  updated_at: string | null;
  country_code: string | null;
  country_name: string | null;
  currency: string | null;
  timezone: string | null;
  iana_timezone: string | null;
  shop_owner: string | null;
  money_format: string | null;
  money_with_currency_format: string | null;
  weight_unit: string | null;
  province_code: string | null;
  taxes_included: boolean | null;
  tax_shipping: boolean | null;
  plan_display_name: string | null;
  myshopify_domain: string | null;
  money_in_emails_format: string | null;
  money_with_currency_in_emails_format: string | null;
  checkout_api_supported: boolean | null;
  setup_required: boolean | null;
  enabled_presentment_currencies: string[] | null;
  marketing_sms_consent_enabled_at_checkout: boolean | null;
  transactional_sms_disabled: boolean | null;
}
