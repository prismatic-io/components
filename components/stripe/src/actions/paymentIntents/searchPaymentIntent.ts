import { action, outputSchema } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../client";
import { searchPaymentIntentsExamplePayload } from "../../examplePayloads/paymentIntents";
import { searchPaymentIntentInputs } from "../../inputs";
import { searchPaymentIntentsOutputSchema } from "../../outputSchemas";
export const searchPaymentIntent = action({
  display: {
    label: "Search Payment Intents",
    description:
      "Search for payment intents previously created using Stripe's Search Query Language.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { timeout, stripeConnection, query, pagination },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    const params: Stripe.PaymentIntentSearchParams = {
      query,
      limit: pagination.limit,
      page: pagination.page,
    };
    return {
      data: await client.paymentIntents.search(params),
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: searchPaymentIntentsExamplePayload.data,
  }),
  inputs: searchPaymentIntentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: searchPaymentIntentsOutputSchema,
  }),
  examplePayload: searchPaymentIntentsExamplePayload,
});
