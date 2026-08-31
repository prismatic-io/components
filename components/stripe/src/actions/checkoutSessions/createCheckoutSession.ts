import { action, outputSchema } from "@prismatic-io/spectral";
import type { Stripe } from "stripe";
import { createStripeClient } from "../../client";
import { createCheckoutSessionInputs } from "../../inputs";
import { checkoutSessionOutputSchema } from "../../outputSchemas";
import { createCheckoutSessionExamplePayload } from "../../examplePayloads/checkoutSessions";
export const createCheckoutSession = action({
  display: {
    label: "Create Checkout Session",
    description: "Create a new Stripe Checkout session.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      cancelUrl,
      clientReferenceId,
      customerEmail,
      customerId,
      lineItems,
      mode,
      successUrl,
      stripeConnection,
      timeout,
      bodyParams,
    },
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
      customer: customerId,
      customer_email: customerEmail,
      client_reference_id: clientReferenceId,
      ...bodyParams,
    });
    return {
      data: session,
    };
  },
  examplePerform: async (
    _context,
    { mode, customerId },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...createCheckoutSessionExamplePayload.data,
      mode,
      customer: customerId ?? createCheckoutSessionExamplePayload.data.customer,
    },
  }),
  inputs: createCheckoutSessionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: checkoutSessionOutputSchema,
  }),
  examplePayload: createCheckoutSessionExamplePayload,
});
