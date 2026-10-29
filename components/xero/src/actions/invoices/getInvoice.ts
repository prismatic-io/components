import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { getInvoiceInputs } from "../../inputs";
import { getInvoiceExamplePayload } from "../../examplePayloads";

export const getInvoice = action({
  display: {
    label: "Get Invoice",
    description: "Retrieve the information and metadata of an invoice by ID.",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/invoices/${params.invoiceId}`);
    return { data };
  },
  inputs: getInvoiceInputs,
  examplePayload: getInvoiceExamplePayload,
});
