import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { getPaymentIntentExamplePayload } from "../../examplePayloads/paymentIntents";
import { clientSecret, connectionInput, paymentIntent, timeout } from "../../inputs";
import type Stripe from "stripe";

export const getPaymentIntent = action({
  display: {
    label: "Get Payment Intent",
    description: "Retrieve the details of a payment intent that has previously been created.",
  },
  perform: async (context, { timeout, stripeConnection, paymentIntent, clientSecret }) => {
    const client = createStripeClient({
      stripeConnection: stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    const params: Stripe.PaymentIntentRetrieveParams = {
      ...(clientSecret && { client_secret: clientSecret }),
    };
    return {
      data: await client.paymentIntents.retrieve(paymentIntent, params),
    };
  },
  inputs: {
    timeout,
    stripeConnection: connectionInput,
    paymentIntent: {
      ...paymentIntent,
      required: true,
      comments: "The ID of the PaymentIntent to retrieve.",
      label: "Payment ID",
    },
    clientSecret,
  },
  examplePayload: getPaymentIntentExamplePayload,
});
