import { action } from "@prismatic-io/spectral";
import { createKarbonClient } from "../../client";
import { cleanOdata } from "../../utils";
import listInvoicesInputs from "../../inputs/invoices/listInvoices";
import { listInvoicesExamplePayload } from "../../examplePayloads";


export const listInvoices = action({
  display: {
    label: "List Invoices",
    description: "List invoices",
  },
  inputs: { ...listInvoicesInputs },
  perform: async (
    context,
    { connection, includeLineItems, $orderby },
  ) => {
    const client = createKarbonClient(connection, context.debug.enabled);
    const response = await client.get("/v3/Invoices", {
      params: { $expand: includeLineItems ? "LineItems" : undefined, $orderby },
    });
    return { data: cleanOdata(response.data) };
  },
  examplePayload: listInvoicesExamplePayload,
});
