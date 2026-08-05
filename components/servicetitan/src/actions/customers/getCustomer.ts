import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCustomerExamplePayload } from "../../examplePayloads";
import { getCustomerInputs } from "../../inputs";
export const getCustomer = action({
  display: {
    label: "Get Customer",
    description: "Retrieve a Customer by ID",
  },
  inputs: getCustomerInputs,
  perform: async (context, { connection, customerId }) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    const { data } = await client.get(`/customers/${customerId}`);
    return {
      data,
    };
  },
  examplePayload: getCustomerExamplePayload,
});
