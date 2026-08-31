import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { listCustomersExamplePayload } from "../../examplePayloads/customers";
import { listCustomersInputs } from "../../inputs";
import { listCustomersOutputSchema } from "../../outputSchemas";
export const listCustomers = action({
  display: {
    label: "List Customers",
    description: "Return a list of customers.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const client = createStripeClient({
      stripeConnection: params.stripeConnection,
      timeout: params.timeout,
    });
    return {
      data: await client.customers.list({
        limit: params.pagination.limit,
        starting_after: params.pagination.startingAfter,
      }),
    };
  },
  inputs: listCustomersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCustomersOutputSchema,
  }),
  examplePayload: listCustomersExamplePayload,
});
