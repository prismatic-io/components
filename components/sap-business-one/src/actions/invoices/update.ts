import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection } from "../../inputs/general";
import { DEFAULT_UPDATE_RESPONSE } from "../../constants";
import { updateInvoiceInputs } from "../../inputs/invoices/update";

export const updateInvoice = action({
  display: {
    label: "Update Invoice",
    description: "Update an instance of Invoices.",
  },
  inputs: {
    ...updateInvoiceInputs,
    connection,
  },
  perform: async (context, { connection, bodyFields, Comments, invoiceDocumentEntry }) => {
    const client = await createClient(connection, context, context.debug.enabled);

    await client.patch(`/Invoices(${invoiceDocumentEntry})`, {
      Comments,
      ...bodyFields,
    });

    return {
      data: DEFAULT_UPDATE_RESPONSE,
    };
  },
  examplePayload: {
    data: DEFAULT_UPDATE_RESPONSE,
  },
});
