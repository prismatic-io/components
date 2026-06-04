import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { connection, site, company } from "../../inputs/general";
import updateCustomerInputs from "../../inputs/customer/updateCustomerInputs";
import { updateCustomerPayload } from "../../examplePayloads";

export const updateCustomer = action({
  display: {
    label: "Update Customer",
    description: "Edit an existing customer",
  },
  perform: async (
    context,
    {
      connection,
      customerId,
      site,
      company,
      shortName,
      onHold,
      statusReason,
      accountStatusType,
      currencyId,
      exchangeRateType,
      telephoneCountryCode,
      telephoneAreaCode,
      telephoneSubscriberNumber,
      faxCountryCode,
      faxAreaCode,
      faxSubscriberNumber,
      website,
      additionalFields,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const payload = {
      short_name: shortName,
      on_hold: onHold,
      status_reason: statusReason,
      account_status_type: accountStatusType,
      currency_id: currencyId,
      exchange_rate_type: exchangeRateType,
      telephone_country_code: telephoneCountryCode,
      telephone_area_code: telephoneAreaCode,
      telephone_subscriber_number: telephoneSubscriberNumber,
      fax_country_code: faxCountryCode,
      fax_area_code: faxAreaCode,
      fax_subscriber_number: faxSubscriberNumber,
      website,
      ...(additionalFields || {}),
    };
    const { data } = await client.put(`/customers/${customerId}`, payload);
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
    ...updateCustomerInputs,
  },
  examplePayload: updateCustomerPayload,
});
