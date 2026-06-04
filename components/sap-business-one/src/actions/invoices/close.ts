import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { invoiceDocumentEntry } from "../../inputs/invoices/general";

export const closeInvoice = action({
  display: {
    label: "Close Invoice",
    description: "Invoke the method Close.",
  },
  inputs: {
    invoiceDocumentEntry,
    connection,
  },
  perform: async (context, { connection, invoiceDocumentEntry }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    const { data } = await client.post(`/Invoices(${invoiceDocumentEntry})/Close`);
    return {
      data,
    };
  },
});
