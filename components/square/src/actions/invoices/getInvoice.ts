import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { getInvoiceExamplePayload } from "../../examplePayloads";
import { getInvoiceInputs } from "../../inputs";

export const getInvoice = action({
  display: {
    label: "Get Invoice",
    description: "Retrieves an invoice by its ID.",
  },
  perform: async (context, { squareConnection, invoiceId }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const response = await client.get(`/v2/invoices/${invoiceId}`);

    return {
      data: response.data,
    };
  },
  inputs: getInvoiceInputs,
  examplePayload: getInvoiceExamplePayload,
});
