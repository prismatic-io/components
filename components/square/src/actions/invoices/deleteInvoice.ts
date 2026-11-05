import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient, getVersionFromConnection } from "../../client";
import { deleteInvoiceExamplePayload } from "../../examplePayloads";
import { deleteInvoiceInputs } from "../../inputs";

export const deleteInvoice = action({
  display: {
    label: "Delete Invoice",
    description: "Deletes an invoice.",
  },
  perform: async (context, { squareConnection, invoiceId }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);
    const version = getVersionFromConnection(squareConnection);

    const response = await client.delete(`/v2/invoices/${invoiceId}`, {
      params: { version },
    });

    return {
      data: response.data,
    };
  },
  inputs: deleteInvoiceInputs,
  examplePayload: deleteInvoiceExamplePayload,
});
