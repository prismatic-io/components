import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { contactId, connectionInput } from "../../inputs";
import { getInvoiceHistoryExamplePayload } from "../../examplePayloads";

export const getInvoiceHistory = action({
  display: {
    label: "Get Invoice History",
    description:
      "Get the information and metadata of an existing invoice's history by Id",
  },
  perform: async (context, params) => {
    const client = await getXeroClient(
      params.xeroConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/invoices/${params.contactId}/history`);
    return { data };
  },
  examplePayload: getInvoiceHistoryExamplePayload,
  inputs: { contactId, xeroConnection: connectionInput },
});
