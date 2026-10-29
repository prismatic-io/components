import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { getCustomerDeliveryAddressPayload } from "../../examplePayloads";
import getCustomerDeliveryAddressInputs from "../../inputs/customerDeliveryAddress/getCustomerDeliveryAddressInputs";
import { company, connection, site } from "../../inputs/general";

export const getCustomerDeliveryAddress = action({
  display: {
    label: "Get Customer Delivery Address",
    description: "Retrieve customer delivery address by ID",
  },
  perform: async (
    context,
    { connection, deliveryAddressId, site, company },
  ) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await client.get(
      `/customer_delivery_addresses/${deliveryAddressId}`,
    );
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
    ...getCustomerDeliveryAddressInputs,
  },
  examplePayload: getCustomerDeliveryAddressPayload,
});
