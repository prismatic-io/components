import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { getCustomerExamplePayload } from "../../examplePayloads/customers";
import { connectionInput, customerId, timeout } from "../../inputs";

export const getCustomer = action({
  display: {
    label: "Get Customer",
    description: "Retrieve the information and metadata of a customer by ID.",
  },
  perform: async (context, { customerId, timeout, stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    return {
      data: await client.customers.retrieve(util.types.toString(customerId)),
    };
  },
  inputs: { customerId, timeout, stripeConnection: connectionInput },
  examplePayload: getCustomerExamplePayload,
});
