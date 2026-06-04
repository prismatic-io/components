import { action } from "@prismatic-io/spectral";
import getInvoiceInputs from "../../inputs/invoices/getInvoice";
import { createKarbonClient } from "../../client";
import { cleanOdata } from "../../utils";
import { getInvoiceExamplePayload } from "../../examplePayloads";

export const getInvoice = action({
  display: {
    label: "Get Invoice",
    description: "Get an invoice by key",
  },
  inputs: {
    ...getInvoiceInputs,
  },
  perform: async (
    context,
    { connection, invoiceKey, includeLineItems },
  ) => {
    const client = createKarbonClient(connection, context.debug.enabled);
    const response = await client.get(`/v3/Invoices/${invoiceKey}`, {
      params: { $expand: includeLineItems ? "LineItems" : undefined },
    });
    return { data: cleanOdata(response.data) };
  },
  examplePayload: getInvoiceExamplePayload,
});
