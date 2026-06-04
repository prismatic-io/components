import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { listCustomersExamplePayload } from "../../examplePayloads/customers";
import { connectionInput, limit, startingAfter, timeout } from "../../inputs";

export const listCustomers = action({
  display: {
    label: "List Customers",
    description: "Return a list of customers.",
  },
  perform: async (context, params) => {
    const client = createStripeClient({
      stripeConnection: params.stripeConnection,
      timeout: util.types.toInt(params.timeout),
    });
    return {
      data: await client.customers.list({
        limit: util.types.toNumber(params.limit) || undefined,
        starting_after: util.types.toString(params.startingAfter) || undefined,
      }),
    };
  },
  inputs: { timeout, limit, startingAfter, stripeConnection: connectionInput },
  examplePayload: listCustomersExamplePayload,
});
