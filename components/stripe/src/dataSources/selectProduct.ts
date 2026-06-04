import { dataSource, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../auth";
import { connectionInput } from "../inputs";
import type { Product, StripeResponse } from "../types";

export const selectProduct = dataSource({
  display: {
    label: "Select Product",
    description: "A picklist of products in your Stripe account.",
  },
  perform: async (_, { stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
    });
    const { data } = (await client.products.list()) as StripeResponse<Product>;
    return {
      result: data.map(({ id, name: label }) => ({
        key: util.types.toString(id),
        label: label || "No product name",
      })),
    };
  },
  dataSourceType: "picklist",
  inputs: {
    stripeConnection: connectionInput,
  },
});
