import { createKarbonClient } from "../../client";
import { dataSource, type Element } from "@prismatic-io/spectral";
import { connection } from "../../inputs/shared";
import { cleanOdata } from "../../utils";
import type { Invoice } from "../../interfaces/Invoice";

export const selectInvoice = dataSource({
  display: {
    label: "Select Invoice",
    description: "Select an Invoice from a dropdown menu",
  },
  inputs: { connection },
  dataSourceType: "picklist",
  perform: async (context, { connection }) => {
    const client = createKarbonClient(connection, false);
    const response = await client.get("/v3/Invoices");
    const data = cleanOdata<Invoice>(response.data);
    const invoices = data.value || [];
    const objects = invoices.map<Element>((invoice) => ({
      key: invoice.InvoiceKey,
      label: invoice.InvoiceNumber,
    }));

    return { result: objects };
  },
});
