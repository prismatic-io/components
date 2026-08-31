import { action, outputSchema } from "@prismatic-io/spectral";
import type Stripe from "stripe";
import { createStripeClient } from "../../client";
import { updateInvoiceExamplePayload } from "../../examplePayloads/invoices";
import { updateInvoiceInputs } from "../../inputs";
import { invoiceOutputSchema } from "../../outputSchemas";
export const updateInvoice = action({
  display: {
    label: "Update Invoice",
    description: "Update an existing invoice.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      invoiceId,
      paymentId,
      collectionMethod,
      dueDate,
      fieldValues,
      metadata,
      additionalFields,
      timeout,
      description,
      stripeConnection,
    },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    return {
      data: await client.invoices.update(invoiceId, {
        collection_method: collectionMethod as
          | Stripe.InvoiceCreateParams.CollectionMethod
          | undefined,
        description: description,
        auto_advance: additionalFields.autoAdvance,
        application_fee_amount: additionalFields.applicationFeeAmount,
        default_payment_method: paymentId,
        due_date: dueDate,
        ...((additionalFields.coupon || additionalFields.discount) && {
          discounts: [
            {
              ...(additionalFields.coupon && {
                coupon: additionalFields.coupon,
              }),
              ...(additionalFields.discount && {
                discount: additionalFields.discount,
              }),
            },
          ],
        }),
        metadata,
        ...fieldValues,
      }),
    };
  },
  examplePerform: async (
    _context,
    {
      invoiceId,
      paymentId,
      collectionMethod,
      dueDate,
      metadata,
      additionalFields,
      description,
    },
  ): Promise<{
    data: unknown;
  }> => {
    const invoice = updateInvoiceExamplePayload.data as Record<string, unknown>;
    return {
      data: {
        ...invoice,
        id: invoiceId,
        collection_method: collectionMethod ?? invoice.collection_method,
        description: description ?? invoice.description,
        auto_advance: additionalFields.autoAdvance,
        application_fee_amount:
          additionalFields.applicationFeeAmount ??
          invoice.application_fee_amount,
        default_payment_method: paymentId ?? invoice.default_payment_method,
        due_date: dueDate ?? invoice.due_date,
        metadata,
      },
    };
  },
  inputs: updateInvoiceInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: invoiceOutputSchema,
  }),
  examplePayload: updateInvoiceExamplePayload,
});
