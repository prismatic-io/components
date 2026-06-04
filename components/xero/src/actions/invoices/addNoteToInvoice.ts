import { action, util } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { invoiceId, notes, connectionInput } from "../../inputs";
import { addNoteToInvoiceExamplePayload } from "../../examplePayloads";

export const addNoteToInvoice = action({
  display: {
    label: "Add Notes To Invoice",
    description: "Add additional notes to an invoice by Id",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.put(`/invoices/${params.invoiceId}/history`, {
      HistoryRecords: [
        {
          Details: util.types.toString(params.notes),
        },
      ],
    });
    return { data };
  },
  inputs: { invoiceId, notes, xeroConnection: connectionInput },
  examplePayload: addNoteToInvoiceExamplePayload,
});
