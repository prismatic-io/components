import { dataSource, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../auth";
import { connectionInput } from "../inputs";
import type { Invoice, StripeResponse } from "../types";

export const selectInvoice = dataSource({
  display: {
    label: "Select Invoice",
    description: "A picklist of invoices in your Stripe account.",
  },
  dataSourceType: "picklist",
  perform: async (_, { stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
    });
    const { data } = (await client.invoices.list()) as unknown as StripeResponse<Invoice>;

    return {
      result: data.map(({ id, description, currency }) => ({
        key: util.types.toString(id),
        label: `${description || "No description"} - ${currency || "No currency"}`,
      })),
    };
  },
  inputs: {
    stripeConnection: connectionInput,
  },
});
