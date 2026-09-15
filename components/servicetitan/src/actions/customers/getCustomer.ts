import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCustomerExamplePayload } from "../../examplePayloads";
import { getCustomerInputs } from "../../inputs";
import { getCustomerOutputSchema } from "../../outputSchemas";
export const getCustomer = action({
  display: {
    label: "Get Customer",
    description: "Retrieve a customer by ID.",
  },
  inputs: getCustomerInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCustomerOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, customerId }) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    const { data } = await client.get(`/customers/${customerId}`);
    return {
      data,
    };
  },
  examplePayload: getCustomerExamplePayload,
});
