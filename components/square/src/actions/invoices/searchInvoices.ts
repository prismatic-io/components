import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { searchInvoicesExamplePayload } from "../../examplePayloads";
import { searchInvoicesInputs } from "../../inputs";

export const searchInvoices = action({
  display: {
    label: "Search Invoices",
    description: "Searches for invoices from a location specified in the filter.",
  },
  perform: async (context, { squareConnection, limit, invoiceQuery, cursor }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const requestBody = {
      cursor,
      limit: limit || 100,
      query: invoiceQuery,
    };

    const response = await client.post("/v2/invoices/search", requestBody);

    return {
      data: response.data,
    };
  },
  inputs: searchInvoicesInputs,
  examplePayload: searchInvoicesExamplePayload,
});
