import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { cancelPaymentIntentExamplePayload } from "../../examplePayloads/paymentIntents";
import { cancelPaymentIntentInputs } from "../../inputs";
import { paymentIntentOutputSchema } from "../../outputSchemas";
import type Stripe from "stripe";
export const cancelPaymentIntent = action({
  display: {
    label: "Cancel Payment Intent",
    description:
      "Cancel a payment intent. A payment intent can be canceled when it is in one of these statuses: requires_payment_method, requires_capture, requires_confirmation, requires_action, or, in rare cases, processing.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { timeout, stripeConnection, paymentIntentId, cancellationReason },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    const params: Stripe.PaymentIntentCancelParams = {
      cancellation_reason: cancellationReason as
        | Stripe.PaymentIntentCancelParams.CancellationReason
        | undefined,
    };
    return {
      data: await client.paymentIntents.cancel(paymentIntentId, params),
    };
  },
  examplePerform: async (
    _context,
    { paymentIntentId, cancellationReason },
  ): Promise<{
    data: unknown;
  }> => {
    const intent = cancelPaymentIntentExamplePayload.data as Record<
      string,
      unknown
    >;
    return {
      data: {
        ...intent,
        id: paymentIntentId,
        cancellation_reason: cancellationReason ?? intent.cancellation_reason,
      },
    };
  },
  inputs: cancelPaymentIntentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: paymentIntentOutputSchema,
  }),
  examplePayload: cancelPaymentIntentExamplePayload,
});
