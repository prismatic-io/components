import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { listPaymentIntentsExamplePayload } from "../../examplePayloads/paymentIntents";
import {
  connectionInput,
  created,
  customerId,
  endingBefore,
  limit,
  startingAfter,
  timeout,
} from "../../inputs";
import type Stripe from "stripe";

export const listPaymentIntents = action({
  display: {
    label: "List Payment Intents",
    description: "Return a list of payment intents.",
  },
  perform: async (
    context,
    { stripeConnection, timeout, customerId, created, endingBefore, limit, startingAfter },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    const options: Stripe.PaymentIntentListParams = {
      ...(customerId && { customer: customerId }),
      ...(created && { created: JSON.parse(created) }),
      ...(endingBefore && { ending_before: endingBefore }),
      ...(limit && { limit: util.types.toInt(limit) }),
      ...(startingAfter && { starting_after: startingAfter }),
    };
    return {
      data: await client.paymentIntents.list(options),
    };
  },
  inputs: {
    timeout,
    stripeConnection: connectionInput,
    customerId: {
      ...customerId,
      label: "Customer",
      comments: "Only return PaymentIntents for the customer specified by this customer ID.",
      clean: util.types.toString,
    },
    created,
    endingBefore: { ...endingBefore, clean: util.types.toString },
    limit: { ...limit, clean: util.types.toString },
    startingAfter: { ...startingAfter, clean: util.types.toString },
  },
  examplePayload: listPaymentIntentsExamplePayload,
});
