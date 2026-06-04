import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { connection, site, company } from "../../inputs/general";
import deleteCustomerDeliveryAddressInputs from "../../inputs/customerDeliveryAddress/deleteCustomerDeliveryAddressInputs";
import { emptyPayload } from "../../examplePayloads";

export const deleteCustomerDeliveryAddress = action({
  display: {
    label: "Delete Customer Delivery Address",
    description: "Delete a customer delivery address by ID",
  },
  perform: async (
    context,
    { connection, deliveryAddressId, site, company },
  ) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await client.delete(
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
    ...deleteCustomerDeliveryAddressInputs,
  },
  examplePayload: emptyPayload,
});
