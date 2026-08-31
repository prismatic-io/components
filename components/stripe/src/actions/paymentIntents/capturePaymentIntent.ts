import { action, outputSchema } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../client";
import { capturePaymentIntentExamplePayload } from "../../examplePayloads/paymentIntents";
import { capturePaymentIntentInputs } from "../../inputs";
import { paymentIntentOutputSchema } from "../../outputSchemas";
export const capturePaymentIntent = action({
  display: {
    label: "Capture Payment Intent",
    description:
      "Capture the funds of an existing uncaptured payment intent when its status is requires_capture.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      timeout,
      stripeConnection,
      paymentIntentId,
      amountToCapture,
      metadata,
      additionalFields,
    },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    const params: Stripe.PaymentIntentCaptureParams = {
      amount_to_capture: amountToCapture,
      metadata,
      application_fee_amount: additionalFields.applicationFeeAmount,
      statement_descriptor: additionalFields.statementDescriptor,
      statement_descriptor_suffix: additionalFields.statementDescriptorSuffix,
      transfer_data: additionalFields.transferData,
    };
    return {
      data: await client.paymentIntents.capture(paymentIntentId, params),
    };
  },
  examplePerform: async (
    _context,
    { paymentIntentId, amountToCapture, metadata, additionalFields },
  ): Promise<{
    data: unknown;
  }> => {
    const intent = capturePaymentIntentExamplePayload.data as Record<
      string,
      unknown
    >;
    return {
      data: {
        ...intent,
        id: paymentIntentId,
        amount_received: amountToCapture ?? intent.amount_received,
        application_fee_amount:
          additionalFields.applicationFeeAmount ??
          intent.application_fee_amount,
        statement_descriptor:
          additionalFields.statementDescriptor ?? intent.statement_descriptor,
        statement_descriptor_suffix:
          additionalFields.statementDescriptorSuffix ??
          intent.statement_descriptor_suffix,
        transfer_data: additionalFields.transferData ?? intent.transfer_data,
        metadata,
      },
    };
  },
  inputs: capturePaymentIntentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: paymentIntentOutputSchema,
  }),
  examplePayload: capturePaymentIntentExamplePayload,
});
