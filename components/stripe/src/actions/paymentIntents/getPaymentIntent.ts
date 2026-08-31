import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { getPaymentIntentExamplePayload } from "../../examplePayloads/paymentIntents";
import { getPaymentIntentInputs } from "../../inputs";
import { paymentIntentOutputSchema } from "../../outputSchemas";
import type Stripe from "stripe";
export const getPaymentIntent = action({
  display: {
    label: "Get Payment Intent",
    description:
      "Retrieve the details of a payment intent that has previously been created.",
  },
  performSafety: "safe",
  perform: async (
    context,
    { timeout, stripeConnection, paymentIntent, clientSecret },
  ) => {
    const client = createStripeClient({
      stripeConnection: stripeConnection,
      timeout,
    });
    const params: Stripe.PaymentIntentRetrieveParams = {
      ...(clientSecret && { client_secret: clientSecret }),
    };
    return {
      data: await client.paymentIntents.retrieve(paymentIntent, params),
    };
  },
  inputs: getPaymentIntentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: paymentIntentOutputSchema,
  }),
  examplePayload: getPaymentIntentExamplePayload,
});
