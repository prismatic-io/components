import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { connectionInput, invoiceId } from "../../inputs";

export const getInvoiceById = action({
  display: {
    label: "Get Invoice By ID",
    description:
      "Retrieve information about the Invoice which matches the given ID.",
  },
  perform: async (context, params) => {
    const client = createHttpClient(
      params.quickbooksConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/invoice/${params.id}`);

    return {
      data: data.Invoice,
    };
  },
  inputs: {
    quickbooksConnection: connectionInput,
    id: {
      ...invoiceId,
      comments: "The id of the invoice to get.",
    },
  },
});
