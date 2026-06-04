import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { searchPaymentIntentsExamplePayload } from "../../examplePayloads/paymentIntents";
import { connectionInput, limit, page, query, timeout } from "../../inputs";
import type Stripe from "stripe";

export const searchPaymentIntent = action({
  display: {
    label: "Search Payment Intents",
    description:
      "Search for payment intents previously created using Stripe's Search Query Language.",
  },
  perform: async (context, { timeout, stripeConnection, query, limit, page }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    const params: Stripe.PaymentIntentSearchParams = {
      query,
      limit: limit ? util.types.toInt(limit) : undefined,
      page: page || undefined,
    };
    return {
      data: await client.paymentIntents.search(params),
    };
  },
  inputs: {
    timeout,
    stripeConnection: connectionInput,
    query,
    limit: { ...limit, clean: util.types.toString },
    page: { ...page, clean: util.types.toString },
  },
  examplePayload: searchPaymentIntentsExamplePayload,
});
