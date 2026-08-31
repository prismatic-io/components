import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../client";
import { selectChargeInputs } from "../inputs";
export const selectCharge = dataSource({
  display: {
    label: "Select Charge",
    description:
      "Select a charge from a list of charges in the connected Stripe account.",
  },
  dataSourceType: "picklist",
  inputs: selectChargeInputs,
  perform: async (_context, { stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
    });
    const { data } = await client.charges.list({ limit: 100 });
    return {
      result: data
        .map<Element>((charge) => ({
          label:
            `${charge.description || charge.id} - ${charge.amount} ${charge.currency?.toUpperCase() || ""}`.trim(),
          key: util.types.toString(charge.id),
        }))
        .sort((a, b) => (a.label < b.label ? -1 : 1)),
    };
  },
  examplePayload: {
    result: [
      {
        label: "Payment for order #1234 - 5000 USD",
        key: "ch_1JaOXaDtJQgcyrdSRnsI9KW5",
      },
    ],
  },
});
