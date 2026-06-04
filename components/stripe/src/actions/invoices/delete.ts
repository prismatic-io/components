import { action, util } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import { deleteInvoiceExamplePayload } from "../../examplePayloads/invoices";
import { connectionInput, invoiceId, timeout } from "../../inputs";

export const deleteInvoice = action({
  display: {
    label: "Delete Invoice",
    description: "Delete an existing invoice.",
  },
  perform: async (context, { invoiceId, timeout, stripeConnection }) => {
    const client = createStripeClient({
      stripeConnection,
      timeout: util.types.toInt(timeout),
    });
    return {
      data: await client.invoices.del(util.types.toString(invoiceId)),
    };
  },
  inputs: { invoiceId, timeout, stripeConnection: connectionInput },
  examplePayload: deleteInvoiceExamplePayload,
});
