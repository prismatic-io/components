import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { deleteCustomerExamplePayload } from "../../examplePayloads/customers";
import { deleteCustomerInputs } from "../../inputs";
import { deleteCustomerOutputSchema } from "../../outputSchemas";
export const deleteCustomer = action({
  display: {
    label: "Delete Customer",
    description:
      "Permanently delete a customer and immediately cancel any active subscriptions on the customer.",
  },
  performSafety: "notAllowed",
  perform: async (context, { customerId, timeout, stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    return {
      data: await client.customers.del(util.types.toString(customerId)),
    };
  },
  examplePerform: async (
    _context,
    { customerId },
  ): Promise<{
    data: unknown;
  }> => {
    const deleted = deleteCustomerExamplePayload.data as Record<
      string,
      unknown
    >;
    return {
      data: {
        ...deleted,
        id: customerId ?? deleted.id,
      },
    };
  },
  inputs: deleteCustomerInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteCustomerOutputSchema,
  }),
  examplePayload: deleteCustomerExamplePayload,
});
