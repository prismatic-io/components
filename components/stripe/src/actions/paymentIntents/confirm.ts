import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { confirmPaymentIntentExamplePayload } from "../../examplePayloads/paymentIntents";
import {
  captureMethod,
  connectionInput,
  errorOnRequiresAction,
  mandate,
  mandateData,
  offSession,
  paymentIntentId,
  paymentMethod,
  paymentMethodData,
  paymentMethodOptions,
  radarOptions,
  receiptEmail,
  returnUrl,
  setupFutureUsage,
  timeout,
  useStripeSdk,
} from "../../inputs";
import type Stripe from "stripe";

export const confirmPaymentIntent = action({
  display: {
    label: "Confirm Payment Intent",
    description:
      "Confirm that the customer intends to pay with the current or provided payment method.",
  },
  perform: async (
    context,
    {
      timeout,
      stripeConnection,
      paymentIntentId,
      paymentMethod,
      receiptEmail,
      setupFutureUsage,
      captureMethod,
      errorOnRequiresAction,
      mandate,
      mandateData,
      offSession,
      paymentMethodData,
      paymentMethodOptions,
      radarOptions,
      returnUrl,
      useStripeSdk,
    },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    const params: Stripe.PaymentIntentConfirmParams = {
      payment_method: paymentMethod || undefined,
      receipt_email: receiptEmail || undefined,
      setup_future_usage:
        (setupFutureUsage as Stripe.PaymentIntentConfirmParams.SetupFutureUsage) || undefined,
      capture_method: captureMethod as Stripe.PaymentIntentConfirmParams.CaptureMethod,
      error_on_requires_action: errorOnRequiresAction
        ? util.types.toBool(errorOnRequiresAction)
        : undefined,
      mandate: mandate || undefined,
      mandate_data: mandateData ? JSON.parse(mandateData) : undefined,
      off_session: offSession ? util.types.toBool(offSession) : undefined,
      payment_method_data: paymentMethodData ? JSON.parse(paymentMethodData) : undefined,
      payment_method_options: paymentMethodOptions ? JSON.parse(paymentMethodOptions) : undefined,
      radar_options: radarOptions ? JSON.parse(radarOptions) : undefined,
      return_url: returnUrl || undefined,
      use_stripe_sdk: useStripeSdk ? util.types.toBool(useStripeSdk) : undefined,
    };
    return {
      data: await client.paymentIntents.confirm(paymentIntentId, params),
    };
  },
  inputs: {
    timeout,
    stripeConnection: connectionInput,
    paymentIntentId,
    paymentMethod,
    receiptEmail,
    setupFutureUsage,
    captureMethod,
    errorOnRequiresAction,
    mandate,
    mandateData,
    offSession,
    paymentMethodData,
    paymentMethodOptions,
    radarOptions,
    returnUrl,
    useStripeSdk,
  },
  examplePayload: confirmPaymentIntentExamplePayload,
});
