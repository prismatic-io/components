import { dataSource, util } from "@prismatic-io/spectral";
import { connectionInput } from "../inputs";
import { createStripeClient } from "../auth";
import type { Customer, StripeResponse } from "../types";

export const selectCustomer = dataSource({
  display: {
    label: "Select Customer",
    description: "A picklist of customers in your Stripe account.",
  },
  dataSourceType: "picklist",
  inputs: {
    stripeConnection: connectionInput,
  },
  perform: async (_, { stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
    });
    const { data } = (await client.customers.list()) as StripeResponse<Customer>;
    return {
      result: data.map(({ id, email: label }) => ({
        key: util.types.toString(id),
        label: label || "No email",
      })),
    };
  },
});
