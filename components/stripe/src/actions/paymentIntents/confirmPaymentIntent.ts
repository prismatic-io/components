import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { confirmPaymentIntentExamplePayload } from "../../examplePayloads/paymentIntents";
import { confirmPaymentIntentInputs } from "../../inputs";
import { paymentIntentOutputSchema } from "../../outputSchemas";
import type Stripe from "stripe";
export const confirmPaymentIntent = action({
  display: {
    label: "Confirm Payment Intent",
    description:
      "Confirm that the customer intends to pay with the current or provided payment method.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      timeout,
      stripeConnection,
      paymentIntentId,
      paymentMethod,
      receiptEmail,
      captureMethod,
      additionalFields,
    },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    const params: Stripe.PaymentIntentConfirmParams = {
      payment_method: paymentMethod,
      receipt_email: receiptEmail,
      setup_future_usage: additionalFields.setupFutureUsage as
        | Stripe.PaymentIntentConfirmParams.SetupFutureUsage
        | undefined,
      capture_method:
        captureMethod as Stripe.PaymentIntentConfirmParams.CaptureMethod,
      error_on_requires_action: additionalFields.errorOnRequiresAction,
      mandate: additionalFields.mandate,
      mandate_data: additionalFields.mandateData,
      off_session: additionalFields.offSession,
      payment_method_data:
        additionalFields.paymentMethodData as Stripe.PaymentIntentConfirmParams.PaymentMethodData,
      payment_method_options: additionalFields.paymentMethodOptions,
      radar_options: additionalFields.radarOptions,
      return_url: additionalFields.returnUrl,
      use_stripe_sdk: additionalFields.useStripeSdk,
    };
    return {
      data: await client.paymentIntents.confirm(paymentIntentId, params),
    };
  },
  examplePerform: async (
    _context,
    {
      paymentIntentId,
      paymentMethod,
      receiptEmail,
      captureMethod,
      additionalFields,
    },
  ): Promise<{
    data: unknown;
  }> => {
    const intent = confirmPaymentIntentExamplePayload.data as Record<
      string,
      unknown
    >;
    return {
      data: {
        ...intent,
        id: paymentIntentId,
        payment_method: paymentMethod ?? intent.payment_method,
        receipt_email: receiptEmail ?? intent.receipt_email,
        capture_method: captureMethod ?? intent.capture_method,
        setup_future_usage:
          additionalFields.setupFutureUsage ?? intent.setup_future_usage,
        payment_method_options:
          additionalFields.paymentMethodOptions ??
          intent.payment_method_options,
      },
    };
  },
  inputs: confirmPaymentIntentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: paymentIntentOutputSchema,
  }),
  examplePayload: confirmPaymentIntentExamplePayload,
});
