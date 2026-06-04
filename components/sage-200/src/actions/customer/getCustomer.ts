import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { connection, site, company } from "../../inputs/general";
import getCustomerInputs from "../../inputs/customer/getCustomerInputs";
import { getCustomerPayload } from "../../examplePayloads";

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
