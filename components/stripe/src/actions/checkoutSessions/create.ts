import { action } from "@prismatic-io/spectral";
import type { Stripe } from "stripe";
import { createStripeClient } from "../../auth";
import {
  bodyParams,
  cancelUrl,
  clientReferenceId,
  connectionInput,
  customerEmail,
  customerId,
  lineItems,
  mode,
  successUrl,
  timeout,
} from "../../inputs";
import { createCheckoutSessionExamplePayload } from "../../examplePayloads/checkoutSessions";

export const createCheckoutSession = action({
  display: {
    label: "Create Checkout Session",
    description: "Create a new Stripe Checkout session.",
  },
  perform: async (
    context,
    { cancelUrl, lineItems, mode, successUrl, stripeConnection, timeout, bodyParams },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });

    const session = await client.checkout.sessions.create({
      success_url: successUrl,
      cancel_url: cancelUrl,
      mode: mode as Stripe.Checkout.SessionCreateParams.Mode,
      line_items: lineItems as Stripe.Checkout.SessionCreateParams.LineItem[],
      ...bodyParams,
    });

    return {
      data: session,
    };
  },
  inputs: {
    mode,
    lineItems,
    customerEmail: {
      ...customerEmail,
      comments: "The email of the customer to create the checkout session for.",
    },
    customerId: {
      ...customerId,
      comments: "The ID of the customer to create the checkout session for.",
    },
    clientReferenceId,
    successUrl,
    cancelUrl,
    bodyParams,
    timeout,
    stripeConnection: connectionInput,
  },
  examplePayload: createCheckoutSessionExamplePayload,
});
