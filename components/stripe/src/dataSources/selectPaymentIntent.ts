import { dataSource, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../client";
import { selectPaymentIntentInputs } from "../inputs";
import type { PaymentIntent, StripeResponse } from "../types";
export const selectPaymentIntent = dataSource({
  display: {
    label: "Select Payment Intent",
    description:
      "A picklist of payment intents in the connected Stripe account.",
  },
  dataSourceType: "picklist",
  perform: async (
    _,
    { stripeConnection, customerId, startingAfter, endingBefore },
  ) => {
    const client = createStripeClient({
      stripeConnection,
    });
    const { data } = (await client.paymentIntents.list({
      ...(customerId && { customer: customerId }),
      ...(startingAfter && { starting_after: startingAfter }),
      ...(endingBefore && { ending_before: endingBefore }),
    })) as StripeResponse<PaymentIntent>;
    return {
      result: data.map(({ id, description, amount, currency }) => ({
        key: util.types.toString(id),
        label: `${description || "No description"} - ${amount} ${currency}`,
      })),
    };
  },
  inputs: selectPaymentIntentInputs,
});
