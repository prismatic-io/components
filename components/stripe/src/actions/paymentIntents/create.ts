import { action, util } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../auth";
import { createPaymentIntentExamplePayload } from "../../examplePayloads/paymentIntents";
import {
  amount,
  applicationFeeAmount,
  automaticPaymentMethods,
  captureMethod,
  confirm,
  confirmationMethod,
  connectionInput,
  currency,
  customerId,
  description,
  errorOnRequiresAction,
  mandate,
  mandateData,
  metadata,
  offSession,
  onBehalfOf,
  paymentMethod,
  paymentMethodData,
  paymentMethodOptions,
  paymentMethodTypes,
  radarOptions,
  receiptEmail,
  returnUrl,
  setupFutureUsage,
  shipping,
  statementDescriptor,
  statementDescriptorSuffix,
  timeout,
  transferData,
  transferGroup,
  useStripeSdk,
} from "../../inputs";
import { keyValPairListToObject } from "../../util";

export const createPaymentIntent = action({
  display: {
    label: "Create Payment Intent",
    description: "Create a new payment intent.",
  },
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
      offSession,
      paymentMethod,
      receiptEmail,
      setupFutureUsage,
      shipping,
      statementDescriptor,
      statementDescriptorSuffix,
      applicationFeeAmount,
      captureMethod,
      confirmationMethod,
      errorOnRequiresAction,
      mandate,
      mandateData,
      onBehalfOf,
      paymentMethodData,
      paymentMethodOptions,
      paymentMethodTypes,
      radarOptions,
      returnUrl,
      transferData,
      transferGroup,
      useStripeSdk,
    },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    const params: Stripe.PaymentIntentCreateParams = {
      amount: util.types.toInt(amount),
      currency: util.types.toString(currency),
      ...(automaticPaymentMethods && {
        automatic_payment_methods: JSON.parse(automaticPaymentMethods),
      }),
      confirm,
      ...(customerId && { customer: customerId }),
      ...(description && { description }),
      ...(metadata.length && { metadata: keyValPairListToObject(metadata) }),
      ...(offSession && { off_session: util.types.toBool(offSession) }),
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
      ...(confirmationMethod && {
        confirmation_method:
          confirmationMethod as Stripe.PaymentIntentCreateParams.ConfirmationMethod,
      }),
      ...(errorOnRequiresAction && {
        error_on_requires_action: util.types.toBool(errorOnRequiresAction),
      }),
      ...(mandate && { mandate }),
      ...(mandateData && { mandate_data: JSON.parse(mandateData) }),
      ...(onBehalfOf && { on_behalf_of: onBehalfOf }),
      ...(paymentMethodData && {
        payment_method_data: JSON.parse(paymentMethodData),
      }),
      ...(paymentMethodOptions && {
        payment_method_options: JSON.parse(paymentMethodOptions),
      }),
      ...(paymentMethodTypes?.length && {
        payment_method_types: paymentMethodTypes,
      }),
      ...(radarOptions && { radar_options: JSON.parse(radarOptions) }),
      ...(returnUrl && { return_url: returnUrl }),
      ...(transferData && { transfer_data: JSON.parse(transferData) }),
      ...(transferGroup && { transfer_group: transferGroup }),
      ...(useStripeSdk && { use_stripe_sdk: util.types.toBool(useStripeSdk) }),
    };
    return {
      data: await client.paymentIntents.create(params),
    };
  },
  inputs: {
    timeout,
    stripeConnection: connectionInput,
    amount,
    currency: { ...currency, required: true },
    automaticPaymentMethods,
    confirm,
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
    offSession,
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
    confirmationMethod,
    errorOnRequiresAction,
    mandate,
    mandateData,
    onBehalfOf,
    paymentMethodData,
    paymentMethodOptions,
    paymentMethodTypes,
    radarOptions,
    returnUrl,
    transferData,
    transferGroup: {
      ...transferGroup,
      comments: "A string that identifies the resulting payment as part of a group.",
    },
    useStripeSdk,
  },
  examplePayload: createPaymentIntentExamplePayload,
});
