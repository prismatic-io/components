import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { getCustomerExamplePayload } from "../../examplePayloads/customers";
import { getCustomerInputs } from "../../inputs";
import { getCustomerOutputSchema } from "../../outputSchemas";
export const getCustomer = action({
  display: {
    label: "Get Customer",
    description: "Retrieve the information and metadata of a customer by ID.",
  },
  performSafety: "safe",
  perform: async (context, { customerId, timeout, stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    return {
      data: await client.customers.retrieve(util.types.toString(customerId)),
    };
  },
  inputs: getCustomerInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCustomerOutputSchema,
  }),
  examplePayload: getCustomerExamplePayload,
});
