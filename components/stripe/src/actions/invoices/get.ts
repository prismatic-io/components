import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { getInvoiceExamplePayload } from "../../examplePayloads/invoices";
import { connectionInput, invoiceId, timeout } from "../../inputs";

export const getInvoice = action({
  display: {
    label: "Get Invoice",
    description: "Retrieve the information and metadata of an invoice by ID.",
  },
  perform: async (context, { invoiceId, timeout, stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    return {
      data: await client.invoices.retrieve(util.types.toString(invoiceId)),
    };
  },
  inputs: { invoiceId, timeout, stripeConnection: connectionInput },
  examplePayload: getInvoiceExamplePayload,
});
