import { dataSource, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../auth";
import { connectionInput, customerId, endingBefore, startingAfter } from "../inputs";
import type { PaymentIntent, StripeResponse } from "../types";

export const selectPaymentIntent = dataSource({
  display: {
    label: "Select Payment Intent",
    description: "A picklist of payment intents in your Stripe account.",
  },
  dataSourceType: "picklist",
  perform: async (_, { stripeConnection, customerId, startingAfter, endingBefore }) => {
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
  inputs: {
    stripeConnection: connectionInput,
    customerId: {
      ...customerId,
      label: "Customer",
      comments: "Only return PaymentIntents for the customer specified by this customer ID.",
      clean: util.types.toString,
      dataSource: undefined,
    },
    startingAfter: { ...startingAfter, clean: util.types.toString },
    endingBefore: { ...endingBefore, clean: util.types.toString },
  },
});
