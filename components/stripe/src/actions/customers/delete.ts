import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { deleteCustomerExamplePayload } from "../../examplePayloads/customers";
import { connectionInput, customerId, timeout } from "../../inputs";

export const deleteCustomer = action({
  display: {
    label: "Delete Customer",
    description:
      "Permanently delete a customer and immediately cancel any active subscriptions on the customer.",
  },
  perform: async (context, { customerId, timeout, stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    return {
      data: await client.customers.del(util.types.toString(customerId)),
    };
  },
  inputs: { customerId, timeout, stripeConnection: connectionInput },
  examplePayload: deleteCustomerExamplePayload,
});
