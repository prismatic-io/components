import type { RestAddress } from "../../interfaces/RestAddress";

export const addressMapper = (input: RestAddress) => {
  return {
    firstName: input.first_name || undefined,
    lastName: input.last_name || undefined,
    company: input.company || undefined,
    address1: input.address1 || undefined,
    address2: input.address2 || undefined,
    city: input.city || undefined,
    provinceCode: input.province_code || undefined,
    countryCode: input.country_code || undefined,
    zip: input.zip || undefined,
    phone: input.phone || undefined,
  };
};
