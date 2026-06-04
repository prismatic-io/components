import { action, util } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../auth";
import { updateInvoiceExamplePayload } from "../../examplePayloads/invoices";
import {
  applicationFeeAmount,
  autoAdvance,
  collectionMethod,
  connectionInput,
  coupon,
  customerId,
  description,
  discount,
  dueDate,
  fieldValues,
  invoiceId,
  metadata,
  paymentId,
  timeout,
} from "../../inputs";
import { keyValPairListToObject } from "../../util";

export const updateInvoice = action({
  display: {
    label: "Update Invoice",
    description: "Update an existing invoice.",
  },
  perform: async (
    context,
    {
      invoiceId,
      paymentId,
      autoAdvance,
      applicationFeeAmount,
      collectionMethod,
      coupon,
      discount,
      dueDate,
      fieldValues,
      metadata,
      timeout,
      description,
      stripeConnection,
    },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    return {
      data: await client.invoices.update(util.types.toString(invoiceId), {
        collection_method:
          (util.types.toString(collectionMethod) as Stripe.InvoiceCreateParams.CollectionMethod) ||
          undefined,
        description: util.types.toString(description) || undefined,
        auto_advance: util.types.toBool(autoAdvance) || undefined,
        application_fee_amount: util.types.toInt(applicationFeeAmount) || undefined,
        default_payment_method: util.types.toString(paymentId) || undefined,
        due_date: util.types.toInt(dueDate) || undefined,

        discounts: [
          {
            coupon: util.types.toString(coupon) || undefined,
            discount: util.types.toString(discount) || undefined,
          },
        ],
        metadata: keyValPairListToObject(metadata),
        ...(util.types.keyValPairListToObject(fieldValues) || {}),
      }),
    };
  },
  inputs: {
    invoiceId,
    customerId,
    paymentId,
    autoAdvance,
    applicationFeeAmount,
    collectionMethod,
    coupon,
    discount,
    description,
    dueDate,
    fieldValues,
    metadata,
    timeout,
    stripeConnection: connectionInput,
  },
  examplePayload: updateInvoiceExamplePayload,
});
