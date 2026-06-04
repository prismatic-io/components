import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { invoiceId, connectionInput } from "../../inputs";
import { sendInvoiceExamplePayload } from "../../examplePayloads";

export const sendInvoice = action({
  display: {
    label: "Send Invoice",
    description: "Send an existing accounts receivable invoice through email",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(`/invoices/${params.invoiceId}/Email`);
    return { data };
  },
  inputs: { invoiceId, xeroConnection: connectionInput },
  examplePayload: sendInvoiceExamplePayload,
});
