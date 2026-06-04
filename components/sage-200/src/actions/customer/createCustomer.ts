import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { connection, site, company } from "../../inputs/general";
import createCustomerInputs from "../../inputs/customer/createCustomerInputs";
import { createCustomerPayload } from "../../examplePayloads";

export const createCustomer = action({
  display: {
    label: "Create Customer",
    description: "Create a new customer",
  },
  perform: async (
    context,
    {
      connection,
      reference,
      name,
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
      reference,
      name,
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
    const { data } = await client.post("/customers", payload);
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
    ...createCustomerInputs,
  },
  examplePayload: createCustomerPayload,
});
