import { createTimezoneString, getNumericId } from "../../../util";
import type { Shop } from "../../interfaces/Shop";

export const shopMapper = (shop: Shop) => {
  return {
    id: shop ? getNumericId(shop.id) : null,
    name: shop.name,
    email: shop.email,
    domain: shop.myshopifyDomain,
    province: shop.billingAddress?.province ?? null,
    country: shop.billingAddress?.country ?? null,
    address1: shop.billingAddress?.address1 ?? null,
    zip: shop.billingAddress?.zip ?? null,
    city: shop.billingAddress?.city ?? null,
    phone: shop.billingAddress?.phone ?? null,
    latitude: shop.billingAddress?.latitude ?? null,
    longitude: shop.billingAddress?.longitude ?? null,
    address2: shop.billingAddress?.address2 ?? null,
    created_at: shop.createdAt,
    updated_at: shop.updatedAt,
    country_code: shop.billingAddress?.countryCodeV2 ?? null,
    country_name: shop.billingAddress?.country ?? null,
    currency: shop.currencyCode,
    timezone:
      shop.ianaTimezone && shop.timezoneOffset
        ? createTimezoneString(shop.timezoneOffset, shop.ianaTimezone)
        : null,
    iana_timezone: shop.ianaTimezone,
    shop_owner: shop.shopOwnerName,
    money_format: shop.currencyFormats?.moneyFormat ?? null,
    money_with_currency_format: shop.currencyFormats?.moneyWithCurrencyFormat ?? null,
    weight_unit: shop.weightUnit,
    province_code: shop.billingAddress?.provinceCode ?? null,
    taxes_included: shop.taxesIncluded,
    tax_shipping: shop.taxShipping,
    plan_display_name: shop.plan?.displayName,
    myshopify_domain: shop.myshopifyDomain,
    money_in_emails_format: shop.currencyFormats?.moneyInEmailsFormat ?? null,
    money_with_currency_in_emails_format:
      shop.currencyFormats?.moneyWithCurrencyInEmailsFormat ?? null,
    checkout_api_supported: shop.checkoutApiSupported,
    setup_required: shop.setupRequired,
    enabled_presentment_currencies: shop.enabledPresentmentCurrencies,
    marketing_sms_consent_enabled_at_checkout: shop.marketingSmsConsentEnabledAtCheckout,
    transactional_sms_disabled: shop.transactionalSmsDisabled,
  };
};
