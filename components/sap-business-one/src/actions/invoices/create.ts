import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { createInvoiceInputs } from "../../inputs/invoices/create";

export const createInvoice = action({
  display: {
    label: "Create Invoice",
    description: "Create an instance of Invoices.",
  },
  inputs: {
    ...createInvoiceInputs,
    connection,
  },
  perform: async (context, { connection, bodyFields, CardCode, DocumentLines }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    const { data } = await client.post(`/Invoices`, {
      CardCode,
      DocumentLines,
      ...bodyFields,
    });
    return {
      data,
    };
  },
});
