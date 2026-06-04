import { action, util } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { invoiceId, connectionInput } from "../../inputs";
import { voidInvoiceExamplePayload } from "../../examplePayloads";

export const voidInvoice = action({
  display: {
    label: "Void Invoice",
    description:
      "Void an existing approved invoice that has no payments applied to it.",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(`/invoices/${params.invoiceId}`, {
      InvoiceID: util.types.toString(params.invoiceId),
      Status: "VOIDED",
    });
    return { data };
  },
  inputs: { invoiceId, xeroConnection: connectionInput },
  examplePayload: voidInvoiceExamplePayload,
});
