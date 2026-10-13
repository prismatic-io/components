import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { emptyPayload } from "../../examplePayloads";
import deleteCustomerInputs from "../../inputs/customer/deleteCustomerInputs";
import { company, connection, site } from "../../inputs/general";
export const deleteCustomer = action({
  display: {
    label: "Delete Customer",
    description: "Delete a customer by ID",
  },
  perform: async (context, { connection, customerId, site, company }) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await client.delete(`/customers/${customerId}`);
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
    ...deleteCustomerInputs,
  },
  examplePayload: emptyPayload,
});
