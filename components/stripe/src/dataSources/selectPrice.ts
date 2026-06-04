import { dataSource, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../auth";
import { connectionInput } from "../inputs";
import type { Price, StripeResponse } from "../types";

export const selectPrice = dataSource({
  display: {
    label: "Select Price",
    description: "A picklist of prices in your Stripe account.",
  },
  dataSourceType: "picklist",
  perform: async (_, { stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
    });
    const { data } = (await client.prices.list()) as StripeResponse<Price>;
    return {
      result: data.map(({ id, nickname, currency, type }) => ({
        key: util.types.toString(id),
        label: `${nickname || "No nickname"} - ${currency || "No currency"} - ${type || "No type"}`,
      })),
    };
  },
  inputs: {
    stripeConnection: connectionInput,
  },
});
