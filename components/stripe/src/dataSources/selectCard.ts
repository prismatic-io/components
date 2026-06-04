import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../auth";
import { connectionInput, customerId } from "../inputs";

export const selectCard = dataSource({
  display: {
    label: "Select Card",
    description: "Select a card payment method for the selected customer in your Stripe account.",
  },
  dataSourceType: "picklist",
  inputs: {
    stripeConnection: connectionInput,
    customerId: {
      ...customerId,
      dataSource: undefined,
      required: true,
    },
  },
  perform: async (_context, { stripeConnection, customerId }) => {
    const client = createStripeClient({
      stripeConnection,
    });

    const { data } = await client.paymentMethods.list({
      customer: util.types.toString(customerId),
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
