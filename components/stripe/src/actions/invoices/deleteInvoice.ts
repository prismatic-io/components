import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { deleteInvoiceExamplePayload } from "../../examplePayloads/invoices";
import { deleteInvoiceInputs } from "../../inputs";
import { deleteInvoiceOutputSchema } from "../../outputSchemas";
export const deleteInvoice = action({
  display: {
    label: "Delete Invoice",
    description: "Delete an existing invoice.",
  },
  performSafety: "notAllowed",
  perform: async (context, { invoiceId, timeout, stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    return {
      data: await client.invoices.del(invoiceId),
    };
  },
  examplePerform: async (
    _context,
    { invoiceId },
  ): Promise<{
    data: unknown;
  }> => {
    const deleted = deleteInvoiceExamplePayload.data as Record<string, unknown>;
    return {
      data: {
        ...deleted,
        id: invoiceId,
      },
    };
  },
  inputs: deleteInvoiceInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteInvoiceOutputSchema,
  }),
  examplePayload: deleteInvoiceExamplePayload,
});
