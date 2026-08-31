import { action, outputSchema } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../client";
import { updateChargeExamplePayload } from "../../examplePayloads/charges";
import { updateChargeInputs } from "../../inputs";
import { chargeOutputSchema } from "../../outputSchemas";
export const updateCharge = action({
  display: {
    label: "Update Charge",
    description:
      "Update a specified charge by setting the values of the parameters passed.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      stripeConnection,
      timeout,
      chargeId,
      customerId,
      description,
      metadata,
      receiptEmail,
      shipping,
      fraudDetails,
      transferGroup,
    },
  ) => {
    const client = createStripeClient({
      stripeConnection: stripeConnection,
      timeout,
    });
    const update: Stripe.ChargeUpdateParams = {
      ...(customerId && { customer: customerId }),
      ...(description && { description }),
      metadata,
      ...(receiptEmail && { receipt_email: receiptEmail }),
      shipping: shipping as Stripe.ChargeUpdateParams.Shipping,
      fraud_details: fraudDetails as Stripe.ChargeUpdateParams.FraudDetails,
      ...(transferGroup && { transfer_group: transferGroup }),
    };
    return {
      data: await client.charges.update(chargeId, update),
    };
  },
  examplePerform: async (
    _context,
    {
      chargeId,
      customerId,
      description,
      metadata,
      receiptEmail,
      shipping,
      fraudDetails,
      transferGroup,
    },
  ): Promise<{
    data: unknown;
  }> => {
    const charge = updateChargeExamplePayload.data as Record<string, unknown>;
    return {
      data: {
        ...charge,
        id: chargeId,
        customer: customerId ?? charge.customer,
        description: description ?? charge.description,
        metadata,
        receipt_email: receiptEmail ?? charge.receipt_email,
        shipping: shipping ?? charge.shipping,
        fraud_details: fraudDetails ?? charge.fraud_details,
        transfer_group: transferGroup ?? charge.transfer_group,
      },
    };
  },
  inputs: updateChargeInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: chargeOutputSchema,
  }),
  examplePayload: updateChargeExamplePayload,
});
