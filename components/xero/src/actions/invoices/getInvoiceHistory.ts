import { action } from "@prismatic-io/spectral";
import { getXeroClient } from "../../client";
import { getInvoiceHistoryInputs } from "../../inputs";
import { getInvoiceHistoryExamplePayload } from "../../examplePayloads";

export const getInvoiceHistory = action({
  display: {
    label: "Get Invoice History",
    description:
      "Retrieve the information and metadata of an existing invoice's history by ID.",
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
  inputs: getInvoiceHistoryInputs,
});
