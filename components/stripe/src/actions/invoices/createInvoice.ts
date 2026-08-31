import { action, outputSchema } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../client";
import { createInvoiceExamplePayload } from "../../examplePayloads/invoices";
import { createInvoiceInputs } from "../../inputs";
import { invoiceOutputSchema } from "../../outputSchemas";
export const createInvoice = action({
  display: {
    label: "Create Invoice",
    description: "Create a new invoice.",
  },
  performSafety: "notAllowed",
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
      timeout,
    });
    return {
      data: await client.invoices.create({
        ...fieldValues,
        customer: customerId,
        collection_method: collectionMethod as
          | Stripe.InvoiceCreateParams.CollectionMethod
          | undefined,
        subscription: subscriptionId,
        description: description,
        auto_advance: autoAdvance,
        default_payment_method: paymentId,
        metadata,
        due_date: dueDate,
      }),
    };
  },
  examplePerform: async (
    _context,
    {
      customerId,
      paymentId,
      autoAdvance,
      collectionMethod,
      subscriptionId,
      description,
      metadata,
      dueDate,
    },
  ): Promise<{
    data: unknown;
  }> => {
    const invoice = createInvoiceExamplePayload.data as Record<string, unknown>;
    return {
      data: {
        ...invoice,
        customer: customerId ?? invoice.customer,
        collection_method: collectionMethod ?? invoice.collection_method,
        subscription: subscriptionId ?? invoice.subscription,
        description: description ?? invoice.description,
        auto_advance: autoAdvance,
        default_payment_method: paymentId ?? invoice.default_payment_method,
        metadata,
        due_date: dueDate ?? invoice.due_date,
      },
    };
  },
  inputs: createInvoiceInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: invoiceOutputSchema,
  }),
  examplePayload: createInvoiceExamplePayload,
});
