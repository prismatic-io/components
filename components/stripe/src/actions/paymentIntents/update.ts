import { action, util } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../auth";
import { updatePaymentIntentExamplePayload } from "../../examplePayloads/paymentIntents";
import {
  amount,
  applicationFeeAmount,
  captureMethod,
  connectionInput,
  currency,
  customerId,
  description,
  metadata,
  paymentIntentId,
  paymentMethod,
  paymentMethodData,
  paymentMethodOptions,
  paymentMethodTypes,
  receiptEmail,
  setupFutureUsage,
  shipping,
  statementDescriptor,
  statementDescriptorSuffix,
  timeout,
  transferData,
  transferGroup,
} from "../../inputs";
import { keyValPairListToObject } from "../../util";

export const updatePaymentIntent = action({
  display: {
    label: "Update Payment Intent",
    description: "Update properties on a payment intent without confirming.",
  },
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
      setupFutureUsage,
      shipping,
      statementDescriptor,
      statementDescriptorSuffix,
      applicationFeeAmount,
      captureMethod,
      paymentMethodData,
      paymentMethodOptions,
      paymentMethodTypes,
      transferData,
      transferGroup,
      paymentIntentId,
    },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    const params: Stripe.PaymentIntentUpdateParams = {
      amount: util.types.toInt(amount),
      currency: util.types.toString(currency),
      ...(customerId && { customer: customerId }),
      ...(description && { description }),
      ...(metadata.length && { metadata: keyValPairListToObject(metadata) }),
      ...(paymentMethod && { payment_method: paymentMethod }),
      ...(receiptEmail && { receipt_email: receiptEmail }),
      ...(setupFutureUsage && {
        setup_future_usage: setupFutureUsage as Stripe.PaymentIntentCreateParams.SetupFutureUsage,
      }),
      ...(shipping && { shipping: JSON.parse(shipping) }),
      ...(statementDescriptor && { statement_descriptor: statementDescriptor }),
      ...(statementDescriptorSuffix && {
        statement_descriptor_suffix: statementDescriptorSuffix,
      }),
      ...(applicationFeeAmount && {
        application_fee_amount: util.types.toInt(applicationFeeAmount),
      }),
      ...(captureMethod && {
        capture_method: captureMethod as Stripe.PaymentIntentCreateParams.CaptureMethod,
      }),
      ...(paymentMethodData && {
        payment_method_data: JSON.parse(paymentMethodData),
      }),
      ...(paymentMethodOptions && {
        payment_method_options: JSON.parse(paymentMethodOptions),
      }),
      ...(paymentMethodTypes?.length && {
        payment_method_types: paymentMethodTypes,
      }),
      ...(transferData && { transfer_data: JSON.parse(transferData) }),
      ...(transferGroup && { transfer_group: transferGroup }),
    };
    return {
      data: await client.paymentIntents.update(paymentIntentId, params),
    };
  },
  inputs: {
    paymentIntentId,
    timeout,
    stripeConnection: connectionInput,
    amount,
    currency,
    customerId: {
      ...customerId,
      label: "Customer",
      comments: "ID of the Customer this PaymentIntent belongs to, if one exists.",
      clean: util.types.toString,
    },
    description: {
      ...description,
      comments: "An arbitrary string attached to the object. Often useful for displaying to users.",
      clean: util.types.toString,
    },
    metadata,
    paymentMethod,
    receiptEmail: {
      ...receiptEmail,
      comments: "Email address that the receipt for the resulting payment will be sent to. ",
    },
    setupFutureUsage,
    shipping: {
      ...shipping,
      comments: "Shipping information for this PaymentIntent.",
    },
    statementDescriptor,
    statementDescriptorSuffix,
    applicationFeeAmount: {
      ...applicationFeeAmount,
      comments:
        "The amount of the application fee (if any) that will be requested to be applied to the payment and transferred to the application owner’s Stripe account.",
      clean: util.types.toString,
    },
    captureMethod,
    paymentMethodData,
    paymentMethodOptions,
    paymentMethodTypes,
    transferData,
    transferGroup: {
      ...transferGroup,
      comments: "A string that identifies the resulting payment as part of a group.",
    },
  },
  examplePayload: updatePaymentIntentExamplePayload,
});
