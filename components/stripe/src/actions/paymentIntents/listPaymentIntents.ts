import { action, outputSchema } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../client";
import { listPaymentIntentsExamplePayload } from "../../examplePayloads/paymentIntents";
import { listPaymentIntentsInputs } from "../../inputs";
import { listPaymentIntentsOutputSchema } from "../../outputSchemas";
export const listPaymentIntents = action({
  display: {
    label: "List Payment Intents",
    description: "Return a list of payment intents.",
  },
  performSafety: "safe",
  perform: async (
    context,
    { stripeConnection, timeout, customerId, created, pagination },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    const options: Stripe.PaymentIntentListParams = {
      ...(customerId && { customer: customerId }),
      created: created,
      ...(pagination.endingBefore && {
        ending_before: pagination.endingBefore,
      }),
      limit: pagination.limit,
      ...(pagination.startingAfter && {
        starting_after: pagination.startingAfter,
      }),
    };
    return {
      data: await client.paymentIntents.list(options),
    };
  },
  inputs: listPaymentIntentsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listPaymentIntentsOutputSchema,
  }),
  examplePayload: listPaymentIntentsExamplePayload,
});
