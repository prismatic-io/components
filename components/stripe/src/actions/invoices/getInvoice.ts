import { action, outputSchema } from "@prismatic-io/spectral";
import { createStripeClient } from "../../client";
import { getInvoiceExamplePayload } from "../../examplePayloads/invoices";
import { getInvoiceInputs } from "../../inputs";
import { invoiceOutputSchema } from "../../outputSchemas";
export const getInvoice = action({
  display: {
    label: "Get Invoice",
    description: "Retrieve the information and metadata of an invoice by ID.",
  },
  performSafety: "safe",
  perform: async (context, { invoiceId, timeout, stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    return {
      data: await client.invoices.retrieve(invoiceId),
    };
  },
  inputs: getInvoiceInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: invoiceOutputSchema,
  }),
  examplePayload: getInvoiceExamplePayload,
});
