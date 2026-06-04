import { getNumericId } from "../../../util";
import type { Customer } from "../../interfaces/Customer";

export const customerMapper = (customer: Customer) => {
  const customerId = customer.id ? getNumericId(customer.id) : null;
  return {
    id: customerId,
    email: customer.email,
    created_at: customer.createdAt,
    updated_at: customer.updatedAt,
    first_name: customer.firstName,
    last_name: customer.lastName,
    state: customer.state,
    last_order_id: customer.lastOrder?.id ? getNumericId(customer.lastOrder.id) : null,
    note: customer.note,
    verified_email: customer.verifiedEmail,
    multipass_identifier: customer.multipassIdentifier,
    tax_exempt: customer.taxExempt,
    tags: customer.tags?.join(",") ?? null,
    last_order_name: customer.lastOrder?.name ?? null,
    phone: customer.phone,
    addresses: customer.addresses
      ? customer.addresses.map((address) => ({
          id: address.id ? getNumericId(address.id) : null,
          customer_id: customerId,
          first_name: address.firstName,
          last_name: address.lastName,
          company: address.company,
          address1: address.address1,
          address2: address.address2,
          city: address.city,
          province: address.province,
          country: address.country,
          zip: address.zip,
          phone: address.phone,
          name: address.name,
          province_code: address.provinceCode,
          country_code: address.countryCodeV2,
          country_name: address.country,
        }))
      : null,

    tax_exemptions: customer.taxExemptions,
    email_marketing_consent: customer.emailMarketingConsent
      ? {
          state: customer.emailMarketingConsent.marketingState,
          opt_in_level: customer.emailMarketingConsent.marketingOptInLevel,
          consent_updated_at: customer.emailMarketingConsent.consentUpdatedAt,
        }
      : null,
    sms_marketing_consent: customer.smsMarketingConsent
      ? {
          state: customer.smsMarketingConsent.marketingState,
          opt_in_level: customer.smsMarketingConsent.marketingOptInLevel,
          consent_updated_at: customer.smsMarketingConsent.consentUpdatedAt,
          consent_collected_from: customer.smsMarketingConsent.consentCollectedFrom,
        }
      : null,
    admin_graphql_api_id: customer.id,
    default_address: {
      id: customer.defaultAddress?.id ? getNumericId(customer.defaultAddress.id) : null,
      customer_id: customerId,
      first_name: customer.defaultAddress?.firstName ?? null,
      last_name: customer.defaultAddress?.lastName ?? null,
      company: customer.defaultAddress?.company ?? null,
      address1: customer.defaultAddress?.address1 ?? null,
      address2: customer.defaultAddress?.address2 ?? null,
      city: customer.defaultAddress?.city ?? null,
      province: customer.defaultAddress?.province ?? null,
      country: customer.defaultAddress?.country ?? null,
      zip: customer.defaultAddress?.zip ?? null,
      phone: customer.defaultAddress?.phone ?? null,
      name: customer.defaultAddress?.name ?? null,
      province_code: customer.defaultAddress?.provinceCode ?? null,
      country_code: customer.defaultAddress?.countryCodeV2 ?? null,
      country_name: customer.defaultAddress?.country ?? null,
    },
  };
};
