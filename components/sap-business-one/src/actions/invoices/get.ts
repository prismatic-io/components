import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, $select } from "../../inputs/general";
import { invoiceDocumentEntry } from "../../inputs/invoices/general";

export const getInvoice = action({
  display: {
    label: "Get Invoice",
    description:
      "Retrieve all or some selected properties from an instance of Warehouses with the given id.",
  },
  inputs: {
    invoiceDocumentEntry,
    $select,
    connection,
  },
  perform: async (context, { connection, $select, invoiceDocumentEntry }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    const { data } = await client.get(`/Invoices(${invoiceDocumentEntry})`, {
      params: {
        $select,
      },
    });
    return {
      data,
    };
  },
});
