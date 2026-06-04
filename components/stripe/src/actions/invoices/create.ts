import { action, util } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../auth";
import { createInvoiceExamplePayload } from "../../examplePayloads/invoices";
import {
  autoAdvance,
  collectionMethod,
  connectionInput,
  customerId,
  description,
  dueDate,
  fieldValues,
  metadata,
  paymentId,
  subscriptionId,
  timeout,
} from "../../inputs";
import { keyValPairListToObject } from "../../util";

export const createInvoice = action({
  display: {
    label: "Create Invoice",
    description: "Create a new invoice.",
  },
  perform: async (
    context,
    {
      timeout,
      customerId,
      paymentId,
      autoAdvance,
      collectionMethod,
      fieldValues,
      subscriptionId,
      description,
      metadata,
      dueDate,
      stripeConnection,
    },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });

    return {
      data: await client.invoices.create({
        ...(util.types.keyValPairListToObject(fieldValues) || {}),
        customer: util.types.toString(customerId),
        collection_method:
          (util.types.toString(collectionMethod) as Stripe.InvoiceCreateParams.CollectionMethod) ||
          undefined,
        subscription: util.types.toString(subscriptionId) || undefined,
        description: util.types.toString(description) || undefined,
        auto_advance: util.types.toBool(autoAdvance) || undefined,
        default_payment_method: util.types.toString(paymentId) || undefined,
        metadata: keyValPairListToObject(metadata),
        due_date: util.types.toInt(dueDate) || undefined,
      }),
    };
  },
  inputs: {
    timeout,
    customerId,
    collectionMethod,
    paymentId,
    autoAdvance,
    fieldValues,
    subscriptionId,
    description,
    metadata,
    dueDate,
    stripeConnection: connectionInput,
  },
  examplePayload: createInvoiceExamplePayload,
});
