import { action, util } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../auth";
import { capturePaymentIntentExamplePayload } from "../../examplePayloads/paymentIntents";
import {
  amountToCapture,
  applicationFeeAmount,
  connectionInput,
  metadata,
  paymentIntentId,
  statementDescriptor,
  statementDescriptorSuffix,
  timeout,
  transferData,
} from "../../inputs";
import { keyValPairListToObject } from "../../util";

export const capturePaymentIntent = action({
  display: {
    label: "Capture Payment Intent",
    description:
      "Capture the funds of an existing uncaptured payment intent when its status is requires_capture.",
  },
  perform: async (
    context,
    {
      timeout,
      stripeConnection,
      paymentIntentId,
      amountToCapture,
      metadata,
      applicationFeeAmount,
      statementDescriptor,
      statementDescriptorSuffix,
      transferData,
    },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    const params: Stripe.PaymentIntentCaptureParams = {
      amount_to_capture: amountToCapture ? util.types.toInt(amountToCapture) : undefined,
      metadata: metadata.length ? keyValPairListToObject(metadata) : undefined,
      application_fee_amount: applicationFeeAmount
        ? util.types.toInt(applicationFeeAmount)
        : undefined,
      statement_descriptor: statementDescriptor || undefined,
      statement_descriptor_suffix: statementDescriptorSuffix || undefined,
      transfer_data: transferData ? JSON.parse(transferData) : undefined,
    };
    return {
      data: await client.paymentIntents.capture(paymentIntentId, params),
    };
  },
  inputs: {
    timeout,
    stripeConnection: connectionInput,
    paymentIntentId,
    amountToCapture,
    metadata,
    applicationFeeAmount: {
      ...applicationFeeAmount,
      comments:
        "The amount of the application fee (if any) that will be requested to be applied to the payment and transferred to the application owner’s Stripe account.",
      clean: util.types.toString,
    },
    statementDescriptor,
    statementDescriptorSuffix,
    transferData: {
      ...transferData,
      comments:
        "The parameters used to automatically create a Transfer when the payment is captured.",
      example: JSON.stringify({ amount: 1000 }),
    },
  },
  examplePayload: capturePaymentIntentExamplePayload,
});
