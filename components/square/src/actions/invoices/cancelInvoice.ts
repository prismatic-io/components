import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient, getVersionFromConnection } from "../../client";
import { cancelInvoiceExamplePayload } from "../../examplePayloads";
import { cancelInvoiceInputs } from "../../inputs";

export const cancelInvoice = action({
  display: {
    label: "Cancel Invoice",
    description: "Cancels an invoice.",
  },
  perform: async (context, { squareConnection, invoiceId }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const cancelBody = {
      version: getVersionFromConnection(squareConnection),
    };

    const response = await client.post(`/v2/invoices/${invoiceId}/cancel`, cancelBody);

    return {
      data: response.data,
    };
  },
  inputs: cancelInvoiceInputs,
  examplePayload: cancelInvoiceExamplePayload,
});
