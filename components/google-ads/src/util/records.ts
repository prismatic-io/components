import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import {
  DESCRIPTIVE_NAME_UNAVAILABLE,
  googleAdsSearchPath,
  NO_DESCRIPTIVE_NAME,
} from "../constants";
export const getCustomerDescriptiveName = async (
  client: HttpClient,
  customerId: string,
): Promise<string> => {
  try {
    const { data } = await client.post(googleAdsSearchPath(customerId), {
      query: "SELECT customer.descriptive_name FROM customer",
    });
    if (data?.results[0]?.customer) {
      return data.results[0].customer?.descriptiveName || NO_DESCRIPTIVE_NAME;
    }
    return NO_DESCRIPTIVE_NAME;
  } catch (_error) {
    return DESCRIPTIVE_NAME_UNAVAILABLE;
  }
};
