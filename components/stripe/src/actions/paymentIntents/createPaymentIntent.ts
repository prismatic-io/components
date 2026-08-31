import { action, outputSchema } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../client";
import { createPaymentIntentExamplePayload } from "../../examplePayloads/paymentIntents";
import { createPaymentIntentInputs } from "../../inputs";
import { paymentIntentOutputSchema } from "../../outputSchemas";
export const createPaymentIntent = action({
  display: {
    label: "Create Payment Intent",
    description: "Create a new payment intent.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      timeout,
      stripeConnection,
      amount,
      currency,
      automaticPaymentMethods,
      confirm,
      customerId,
      description,
      metadata,
      paymentMethod,
      receiptEmail,
      paymentMethodTypes,
      transferOptions,
      additionalFields,
    },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    const params: Stripe.PaymentIntentCreateParams = {
      amount,
      currency,
      automatic_payment_methods:
        automaticPaymentMethods as Stripe.PaymentIntentCreateParams.AutomaticPaymentMethods,
      confirm,
      ...(customerId && { customer: customerId }),
      ...(description && { description }),
      metadata,
      ...(additionalFields.offSession !== undefined && {
        off_session: additionalFields.offSession,
      }),
      ...(paymentMethod && { payment_method: paymentMethod }),
      ...(receiptEmail && { receipt_email: receiptEmail }),
      ...(additionalFields.setupFutureUsage && {
        setup_future_usage:
          additionalFields.setupFutureUsage as Stripe.PaymentIntentCreateParams.SetupFutureUsage,
      }),
      shipping:
        additionalFields.shipping as Stripe.PaymentIntentCreateParams.Shipping,
      ...(additionalFields.statementDescriptor && {
        statement_descriptor: additionalFields.statementDescriptor,
      }),
      ...(additionalFields.statementDescriptorSuffix && {
        statement_descriptor_suffix: additionalFields.statementDescriptorSuffix,
      }),
      application_fee_amount: transferOptions.applicationFeeAmount,
      ...(additionalFields.captureMethod && {
        capture_method:
          additionalFields.captureMethod as Stripe.PaymentIntentCreateParams.CaptureMethod,
      }),
      ...(additionalFields.confirmationMethod && {
        confirmation_method:
          additionalFields.confirmationMethod as Stripe.PaymentIntentCreateParams.ConfirmationMethod,
      }),
      ...(additionalFields.errorOnRequiresAction !== undefined && {
        error_on_requires_action: additionalFields.errorOnRequiresAction,
      }),
      ...(additionalFields.mandate && { mandate: additionalFields.mandate }),
      mandate_data:
        additionalFields.mandateData as Stripe.PaymentIntentCreateParams.MandateData,
      ...(transferOptions.onBehalfOf && {
        on_behalf_of: transferOptions.onBehalfOf,
      }),
      payment_method_data:
        additionalFields.paymentMethodData as Stripe.PaymentIntentCreateParams.PaymentMethodData,
      payment_method_options: additionalFields.paymentMethodOptions,
      ...(paymentMethodTypes?.length && {
        payment_method_types: paymentMethodTypes,
      }),
      radar_options: additionalFields.radarOptions,
      ...(additionalFields.returnUrl && {
        return_url: additionalFields.returnUrl,
      }),
      transfer_data:
        transferOptions.transferData as Stripe.PaymentIntentCreateParams.TransferData,
      ...(transferOptions.transferGroup && {
        transfer_group: transferOptions.transferGroup,
      }),
      ...(additionalFields.useStripeSdk !== undefined && {
        use_stripe_sdk: additionalFields.useStripeSdk,
      }),
    };
    return {
      data: await client.paymentIntents.create(params),
    };
  },
  examplePerform: async (
    _context,
    {
      amount,
      currency,
      automaticPaymentMethods,
      confirm,
      customerId,
      description,
      metadata,
      paymentMethod,
      receiptEmail,
      paymentMethodTypes,
      transferOptions,
      additionalFields,
    },
  ): Promise<{
    data: unknown;
  }> => {
    const intent = createPaymentIntentExamplePayload.data as Record<
      string,
      unknown
    >;
    return {
      data: {
        ...intent,
        amount,
        currency,
        customer: customerId ?? intent.customer,
        description: description ?? intent.description,
        metadata,
        payment_method: paymentMethod ?? intent.payment_method,
        receipt_email: receiptEmail ?? intent.receipt_email,
        payment_method_types: paymentMethodTypes ?? intent.payment_method_types,
        automatic_payment_methods:
          automaticPaymentMethods ?? intent.automatic_payment_methods,
        capture_method: additionalFields.captureMethod ?? intent.capture_method,
        shipping: additionalFields.shipping ?? intent.shipping,
        application_fee_amount:
          transferOptions.applicationFeeAmount ?? intent.application_fee_amount,
        transfer_group: transferOptions.transferGroup ?? intent.transfer_group,
        ...(confirm ? { status: "succeeded", amount_received: amount } : {}),
      },
    };
  },
  inputs: createPaymentIntentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: paymentIntentOutputSchema,
  }),
  examplePayload: createPaymentIntentExamplePayload,
});
