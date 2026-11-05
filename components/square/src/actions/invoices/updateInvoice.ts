import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { updateInvoiceExamplePayload } from "../../examplePayloads";
import { updateInvoiceInputs } from "../../inputs";

export const updateInvoice = action({
  display: {
    label: "Update Invoice",
    description: "Updates an invoice.",
  },
  perform: async (context, { squareConnection, invoiceId, updateInvoiceInput }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const updateBody = updateInvoiceInput;

    const response = await client.put(`/v2/invoices/${invoiceId}`, updateBody);

    return {
      data: response.data,
    };
  },
  inputs: updateInvoiceInputs,
  examplePayload: updateInvoiceExamplePayload,
});
