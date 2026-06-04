import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { invoicesDatasource } from "../examplePayloads";
import { connection } from "../inputs";
import type { Invoice } from "../interfaces";

export const selectInvoice = dataSource({
  display: {
    label: "Select Invoice",
    description:
      "Select an Invoice from a dropdown menu (up to 10,000 Invoices)",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, "accounting");
    let invoices: Invoice[] = [];
    let cursor = false;
    let page = 1;

    do {
      const { data } = await client.get(`/invoices`, {
        params: {
          includeTotal: true,
          page,
          pageSize: 1000,
        },
      });
      invoices = [...invoices, ...data.data];
      cursor = data.hasMore;
      page++;
    } while (cursor && page < 10);

    
    const objects = invoices
      .sort((a, b) => (a.id < b.id ? -1 : 1))
      .map<Element>((invoice) => ({
        key: invoice.id.toString(),
        label: `#${invoice.referenceNumber}`,
      }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: invoicesDatasource,
  },
});
