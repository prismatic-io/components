import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import {
  storeId,
  customerId,
  optInStatus,
  company,
  firstName,
  lastName,
  address1,
  address2,
  city,
  province,
  provinceCode,
  postalCode,
  country,
  countryCode,
  connectionInput,
} from "./../../../inputs";

export const updateCustomer = action({
  display: {
    label: "Update Customer",
    description: "Update a specific customer's information",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);
    const address = {
      ...(params.address1 && { address1: params.address1 }),
      ...(params.address2 && { address2: params.address2 }),
      ...(params.city && { city: params.city }),
      ...(params.countryCode && { country_code: params.countryCode }),
      ...(params.postalCode && { postal_code: params.postalCode }),
      ...(params.provinceCode && { province_code: params.provinceCode }),
      ...(params.province && { province: params.province }),
      ...(params.country && { country: params.country }),
    };
    const { data } = await client.patch(
      `/ecommerce/stores/${params.storeId}/customers/${params.customerId}`,
      {
        opt_in_status: params.optInStatus,
        ...(params.company && { company: params.company }),
        ...(params.firstName && { first_name: params.firstName }),
        ...(params.lastName && { last_name: params.lastName }),
        ...(Object.keys(address).length > 0 && { address }),
      },
    );
    return { data };
  },
  inputs: {
    storeId: { ...storeId, required: true },
    customerId: { ...customerId, required: true },
    optInStatus,
    company,
    firstName,
    lastName,
    address1,
    address2,
    city,
    province,
    provinceCode,
    postalCode,
    country,
    countryCode,
    connection: connectionInput,
  },
});

export default updateCustomer;
