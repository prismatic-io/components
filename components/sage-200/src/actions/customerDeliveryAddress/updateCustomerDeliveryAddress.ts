import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { connection, site, company } from "../../inputs/general";
import updateCustomerDeliveryAddressInputs from "../../inputs/customerDeliveryAddress/updateCustomerDeliveryAddressInputs";
import { updateCustomerDeliveryAddressPayload } from "../../examplePayloads";

export const updateCustomerDeliveryAddress = action({
  display: {
    label: "Update Customer Delivery Address",
    description: "Edit an existing customer delivery address by ID",
  },
  perform: async (
    context,
    {
      connection,
      deliveryAddressId,
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
    const { data } = await client.put(
      `/customer_delivery_addresses/${deliveryAddressId}`,
      payload,
    );
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
    ...updateCustomerDeliveryAddressInputs,
  },
  examplePayload: updateCustomerDeliveryAddressPayload,
});
