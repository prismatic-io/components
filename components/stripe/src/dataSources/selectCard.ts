import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../client";
import { selectCardInputs } from "../inputs";
export const selectCard = dataSource({
  display: {
    label: "Select Card",
    description:
      "Select a card payment method for the selected customer in the connected Stripe account.",
  },
  dataSourceType: "picklist",
  inputs: selectCardInputs,
  perform: async (_context, { stripeConnection, customerId }) => {
    const client = createStripeClient({
      stripeConnection,
    });
    const { data } = await client.paymentMethods.list({
      customer: customerId,
      type: "card",
      limit: 100,
    });
    return {
      result: data
        .map<Element>((pm) => ({
          label: pm.card
            ? `${pm.card.brand?.toUpperCase() || "Card"} ****${pm.card.last4} (${pm.card.exp_month}/${pm.card.exp_year})`
            : pm.id,
          key: util.types.toString(pm.id),
        }))
        .sort((a, b) => (a.label < b.label ? -1 : 1)),
    };
  },
  examplePayload: {
    result: [
      {
        label: "VISA ****4242 (12/2026)",
        key: "pm_1JaOXaDtJQgcyrdSRnsI9KW5",
      },
    ],
  },
});
