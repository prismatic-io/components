import { action, util } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { invoiceId, connectionInput } from "../../inputs";
import { deleteInvoiceExamplePayload } from "../../examplePayloads";

export const deleteInvoice = action({
  display: {
    label: "Delete Invoice",
    description: "Delete the information and metadata of an invoice by Id",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(`/invoices/${params.invoiceId}`, {
      InvoiceID: util.types.toString(params.invoiceId),
      Status: "DELETED",
    });
    return { data };
  },
  inputs: { invoiceId, xeroConnection: connectionInput },
  examplePayload: deleteInvoiceExamplePayload,
});
