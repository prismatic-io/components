import { action, util } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../auth";
import { updateChargeExamplePayload } from "../../examplePayloads/charges";
import {
  chargeId,
  connectionInput,
  customerId,
  description,
  fraudDetails,
  metadata,
  receiptEmail,
  shipping,
  timeout,
  transferGroup,
} from "../../inputs";
import { keyValPairListToObject } from "../../util";

export const updateCharge = action({
  display: {
    label: "Update Charge",
    description: "Update a specified charge by setting the values of the parameters passed.",
  },
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
      timeout: util.types.toInt(timeout),
    });
    const update: Stripe.ChargeUpdateParams = {
      ...(customerId && { customer: customerId }),
      ...(description && { description }),
      ...(metadata.length && { metadata: keyValPairListToObject(metadata) }),
      ...(receiptEmail && { receipt_email: receiptEmail }),
      ...(shipping && { shipping: JSON.parse(shipping) }),
      ...(fraudDetails && { fraud_details: JSON.parse(fraudDetails) }),
      ...(transferGroup && { transfer_group: transferGroup }),
    };
    return {
      data: await client.charges.update(chargeId, update),
    };
  },
  inputs: {
    timeout,
    stripeConnection: connectionInput,
    chargeId,
    customerId: {
      ...customerId,
      label: "Customer",
      comments: "The ID of an existing customer that will be associated with this request.",
      clean: util.types.toString,
    },
    description: {
      ...description,
      comments:
        "An arbitrary string which you can attach to a charge object. It is displayed when in the web interface alongside the charge",
      clean: util.types.toString,
    },
    metadata,
    receiptEmail,
    shipping,
    fraudDetails,
    transferGroup,
  },
  examplePayload: updateChargeExamplePayload,
});
