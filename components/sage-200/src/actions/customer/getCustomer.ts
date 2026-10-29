import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { getCustomerPayload } from "../../examplePayloads";
import getCustomerInputs from "../../inputs/customer/getCustomerInputs";
import { company, connection, site } from "../../inputs/general";

export const getCustomer = action({
  display: {
    label: "Get Customer",
    description: "Retrieve a customer by ID",
  },
  perform: async (context, { connection, customerId, site, company }) => {
    const client = getClient(connection, context.debug.enabled, site, company);
    const { data } = await client.get(`/customers/${customerId}`);
    return {
      data,
    };
  },
  inputs: {
    connection,
    site,
    company,
    ...getCustomerInputs,
  },
  examplePayload: getCustomerPayload,
});
