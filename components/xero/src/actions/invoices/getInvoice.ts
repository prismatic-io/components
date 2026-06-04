import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { invoiceId, connectionInput } from "../../inputs";
import { getInvoiceExamplePayload } from "../../examplePayloads";

export const getInvoice = action({
  display: {
    label: "Get Invoice",
    description: "Get the information and metadata of an invoice by Id",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/invoices/${params.invoiceId}`);
    return { data };
  },
  inputs: { invoiceId, xeroConnection: connectionInput },
  examplePayload: getInvoiceExamplePayload,
});
