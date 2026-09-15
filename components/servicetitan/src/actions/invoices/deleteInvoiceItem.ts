import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteInvoiceItemExamplePayload } from "../../examplePayloads";
import { deleteInvoiceItemInputs } from "../../inputs";
export const deleteInvoiceItem = action({
  display: {
    label: "Delete Invoice Item",
    description: "Delete an invoice item.",
  },
  inputs: deleteInvoiceItemInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, invoiceId, itemId }) => {
    const client = createClient(
      connection,
      "accounting",
      context.debug.enabled,
    );
    const { data } = await client.delete(
      `/invoices/${invoiceId}/items/${itemId}`,
    );
    return {
      data,
    };
  },
  examplePerform: async () => deleteInvoiceItemExamplePayload,
  examplePayload: deleteInvoiceItemExamplePayload,
});
