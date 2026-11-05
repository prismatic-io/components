import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient, getVersionFromConnection } from "../../client";
import { publishInvoiceExamplePayload } from "../../examplePayloads";
import { publishInvoiceInputs } from "../../inputs";

export const publishInvoice = action({
  display: {
    label: "Publish Invoice",
    description: "Publishes an invoice.",
  },
  perform: async (context, { squareConnection, invoiceId, idempotencyKey }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const publishBody = {
      version: getVersionFromConnection(squareConnection),
      idempotency_key: idempotencyKey,
    };

    const response = await client.post(`/v2/invoices/${invoiceId}/publish`, publishBody);

    return {
      data: response.data,
    };
  },
  inputs: publishInvoiceInputs,
  examplePayload: publishInvoiceExamplePayload,
});
