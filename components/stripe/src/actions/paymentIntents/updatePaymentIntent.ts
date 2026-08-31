import { action, outputSchema } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../client";
import { updatePaymentIntentExamplePayload } from "../../examplePayloads/paymentIntents";
import { updatePaymentIntentInputs } from "../../inputs";
import { paymentIntentOutputSchema } from "../../outputSchemas";
export const updatePaymentIntent = action({
  display: {
    label: "Update Payment Intent",
    description: "Update properties on a payment intent without confirming.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      timeout,
      stripeConnection,
      amount,
      currency,
      customerId,
      description,
      metadata,
      paymentMethod,
      receiptEmail,
      paymentMethodTypes,
      transferOptions,
      additionalFields,
      paymentIntentId,
    },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    const params: Stripe.PaymentIntentUpdateParams = {
      amount,
      ...(currency && { currency }),
      ...(customerId && { customer: customerId }),
      ...(description && { description }),
      metadata,
      ...(paymentMethod && { payment_method: paymentMethod }),
      ...(receiptEmail && { receipt_email: receiptEmail }),
      ...(additionalFields.setupFutureUsage && {
        setup_future_usage:
          additionalFields.setupFutureUsage as Stripe.PaymentIntentCreateParams.SetupFutureUsage,
      }),
      shipping:
        additionalFields.shipping as Stripe.PaymentIntentUpdateParams.Shipping,
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
      payment_method_data:
        additionalFields.paymentMethodData as Stripe.PaymentIntentUpdateParams.PaymentMethodData,
      payment_method_options: additionalFields.paymentMethodOptions,
      ...(paymentMethodTypes?.length && {
        payment_method_types: paymentMethodTypes,
      }),
      transfer_data: transferOptions.transferData,
      ...(transferOptions.transferGroup && {
        transfer_group: transferOptions.transferGroup,
      }),
    };
    return {
      data: await client.paymentIntents.update(paymentIntentId, params),
    };
  },
  examplePerform: async (
    _context,
    {
      amount,
      currency,
      customerId,
      description,
      metadata,
      paymentMethod,
      receiptEmail,
      paymentMethodTypes,
      transferOptions,
      additionalFields,
      paymentIntentId,
    },
  ): Promise<{
    data: unknown;
  }> => {
    const intent = updatePaymentIntentExamplePayload.data as Record<
      string,
      unknown
    >;
    return {
      data: {
        ...intent,
        id: paymentIntentId,
        amount,
        currency: currency ?? intent.currency,
        customer: customerId ?? intent.customer,
        description: description ?? intent.description,
        metadata,
        payment_method: paymentMethod ?? intent.payment_method,
        receipt_email: receiptEmail ?? intent.receipt_email,
        payment_method_types: paymentMethodTypes ?? intent.payment_method_types,
        capture_method: additionalFields.captureMethod ?? intent.capture_method,
        shipping: additionalFields.shipping ?? intent.shipping,
        application_fee_amount:
          transferOptions.applicationFeeAmount ?? intent.application_fee_amount,
        transfer_group: transferOptions.transferGroup ?? intent.transfer_group,
      },
    };
  },
  inputs: updatePaymentIntentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: paymentIntentOutputSchema,
  }),
  examplePayload: updatePaymentIntentExamplePayload,
});
