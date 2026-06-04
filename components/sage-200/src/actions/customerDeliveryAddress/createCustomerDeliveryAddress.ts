import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { connection, site, company } from "../../inputs/general";
import createCustomerDeliveryAddressInputs from "../../inputs/customerDeliveryAddress/createCustomerDeliveryAddressInputs";
import { createCustomerDeliveryAddressPayload } from "../../examplePayloads";

export const createCustomerDeliveryAddress = action({
  display: {
    label: "Create Customer Delivery Address",
    description: "Create a new customer delivery address",
  },
  perform: async (
    context,
    {
      connection,
      customerId,
      description,
      taxCodeId,
      site,
      company,
      isDefault,
      postalName,
      address1,
      address2,
      address3,
      address4,
      city,
      county,
      postcode,
      addressCountryCodeId,
      contact,
      telephone,
      fax,
      email,
      taxNumber,
      countryCodeId,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const payload = {
      customer_id: customerId,
      description,
      tax_code_id: taxCodeId,
      is_default: isDefault,
      postal_name: postalName,
      address_1: address1,
      address_2: address2,
      address_3: address3,
      address_4: address4,
      city,
      county,
      postcode,
      address_country_code_id: addressCountryCodeId,
      contact,
      telephone,
      fax,
      email,
      tax_number: taxNumber,
      country_code_id: countryCodeId,
    };
    const { data } = await client.post("/customer_delivery_addresses", payload);
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
    ...createCustomerDeliveryAddressInputs,
  },
  examplePayload: createCustomerDeliveryAddressPayload,
});
