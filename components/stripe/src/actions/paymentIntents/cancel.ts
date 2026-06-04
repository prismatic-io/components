import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { cancelPaymentIntentExamplePayload } from "../../examplePayloads/paymentIntents";
import { cancellationReason, connectionInput, paymentIntentId, timeout } from "../../inputs";
import type Stripe from "stripe";

export const cancelPaymentIntent = action({
  display: {
    label: "Cancel Payment Intent",
    description:
      "Cancel a payment intent. A payment intent can be canceled when it is in one of these statuses: requires_payment_method, requires_capture, requires_confirmation, requires_action, or, in rare cases, processing.",
  },
  perform: async (context, { timeout, stripeConnection, paymentIntentId, cancellationReason }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    const params: Stripe.PaymentIntentCancelParams = {
      cancellation_reason:
        (cancellationReason as Stripe.PaymentIntentCancelParams.CancellationReason) || undefined,
    };
    return {
      data: await client.paymentIntents.cancel(paymentIntentId, params),
    };
  },
  inputs: {
    timeout,
    stripeConnection: connectionInput,
    paymentIntentId,
    cancellationReason,
  },
  examplePayload: cancelPaymentIntentExamplePayload,
});
