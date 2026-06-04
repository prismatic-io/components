import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import {
  storeId,
  customerId,
  email,
  optInStatus,
  company,
  firstName,
  lastName,
  address1,
  address2,
  city,
  countryCode,
  provinceCode,
  postalCode,
  province,
  country,
  connectionInput,
} from "./../../../inputs";

export const addCustomer = action({
  display: {
    label: "Add Customer",
    description: "Add a new customer to a store",
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

    const { data } = await client.post(
      `/ecommerce/stores/${params.storeId}/customers`,
      {
        id: params.customerId,
        email_address: params.email,
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
    email: { ...email, required: true },
    optInStatus,
    company,
    firstName,
    lastName,
    address1,
    address2,
    city,
    countryCode,
    provinceCode,
    postalCode,
    province,
    country,
    connection: connectionInput,
  },
});

export default addCustomer;
